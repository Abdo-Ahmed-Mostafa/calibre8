const fs = require("fs");
const path = require("path");
const axios = require("axios");
const glob = require("glob");

const TRANSLATIONS_DIR = "./messages"; // مجلد الترجمة
const LANGUAGES = ["en", "fr"]; // اللغات المطلوبة
const LIBRE_TRANSLATE_URL = "https://libretranslate.com/translate";

// تحميل ملفات الترجمة أو إنشاؤها لو مش موجودة
function loadTranslations(lang) {
  const filePath = path.join(TRANSLATIONS_DIR, `${lang}.json`);
  if (!fs.existsSync(filePath)) return {};
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// حفظ الترجمة بعد التعديل
function saveTranslations(lang, data) {
  const filePath = path.join(TRANSLATIONS_DIR, `${lang}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

// دالة الترجمة الجماعية باستخدام LibreTranslate
async function translateBatch(texts, targetLang = "en") {
  try {
    // نرسل كل نص لوحده داخل Promise.all عشان نقدر نترجمهم كلهم مرة واحدة بطريقة غير متزامنة
    const translations = await Promise.all(
      texts.map(async (text) => {
        try {
          const res = await axios.post(LIBRE_TRANSLATE_URL, {
            q: text,
            source: "auto",
            target: targetLang,
            format: "text",
          });
          return res.data.translatedText;
        } catch (err) {
          console.error(
            `❌ Error translating "${text}" to ${targetLang}:`,
            err.message
          );
          return null;
        }
      })
    );

    return translations;
  } catch (err) {
    console.error(`❌ General error in translateBatch:`, err.message);
    return texts.map(() => null);
  }
}

// استخراج كل المفاتيح من t("...")
function extractKeysFromFiles() {
  const files = glob.sync("./src/**/*.{js,jsx,ts,tsx}");
  const keys = new Set();

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf8");
    const matches = content.match(/t\(["'`]([^"'`]+)["'`]\)/g);
    if (matches) {
      matches.forEach((m) => {
        const key = m.match(/t\(["'`]([^"'`]+)["'`]\)/)[1];
        keys.add(key);
      });
    }
  });

  return [...keys];
}

// التشغيل
(async () => {
  if (!fs.existsSync(TRANSLATIONS_DIR)) {
    fs.mkdirSync(TRANSLATIONS_DIR);
  }

  const keys = extractKeysFromFiles();

  for (const lang of LANGUAGES) {
    console.log(`\n🔤 Checking translations for: ${lang}`);
    const translations = loadTranslations(lang);

    const missingKeys = keys.filter((key) => !translations[key]);

    if (missingKeys.length === 0) {
      console.log(`✅ All keys are already translated for ${lang}`);
      continue;
    }

    console.log(`⏳ Translating ${missingKeys.length} keys to ${lang}...`);
    const translated = await translateBatch(missingKeys, lang);

    translated.forEach((value, index) => {
      const key = missingKeys[index];
      if (value) {
        translations[key] = value;
        console.log(`✔ ${lang}: ${key} → ${value}`);
      } else {
        console.warn(`⚠️ Failed to translate: ${key}`);
      }
    });

    saveTranslations(lang, translations);
    console.log(`✅ Updated file: ${lang}.json`);
  }

  console.log("\n🎉 All done!");
})();
