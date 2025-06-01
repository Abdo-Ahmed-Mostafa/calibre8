const fs = require("fs");
const path = require("path");
const glob = require("glob");
const axios = require("axios");

const TRANSLATIONS_DIR = "./messages";
const LANGUAGES = ["en", "fr"]; // ضيف لغات تانية لو عايز

// تحميل ملفات الترجمة أو إنشاء ملف جديد لو مش موجود
function loadTranslations(lang) {
  const filePath = path.join(TRANSLATIONS_DIR, `${lang}.json`);
  if (!fs.existsSync(filePath)) return {};
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error(`❌ Error parsing ${lang}.json:`, err.message);
    return {};
  }
}

// حفظ الترجمة بعد التعديل
function saveTranslations(lang, data) {
  const filePath = path.join(TRANSLATIONS_DIR, `${lang}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

// استخراج مفاتيح الترجمة من الملفات
function extractKeysFromFiles() {
  const files = glob.sync("./src/**/*.{js,jsx,ts,tsx}");
  const keys = new Set();

  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf8");
    const matches = [
      ...content.matchAll(/\bt\s*\(\s*["'`]([\s\S]*?)["'`]\s*\)/g),
    ];
    matches.forEach((m) => {
      const key = m[1].trim();
      keys.add(key);
    });
  });

  return [...keys];
}

// ترجمة النص باستخدام MyMemory API
async function translateText(text, targetLang = "fr") {
  try {
    const response = await axios.get(
      "https://api.mymemory.translated.net/get",
      {
        params: {
          q: text,
          langpair: `en|${targetLang}`,
        },
      }
    );
    const translated = response.data.responseData.translatedText;
    console.log(`"${text}" => "${translated}"`);
    return translated;
  } catch (error) {
    console.error(`❌ Error translating "${text}":`, error.message);
    return "";
  }
}

// التشغيل الرئيسي
(async () => {
  if (!fs.existsSync(TRANSLATIONS_DIR)) {
    fs.mkdirSync(TRANSLATIONS_DIR);
  }

  const keys = extractKeysFromFiles();

  console.log("\n🗝️ All extracted translation keys:");
  keys.forEach((key) => {
    console.log(`t("${key}")`);
  });

  for (const lang of LANGUAGES) {
    console.log(`\n🔍 Checking translations for: ${lang}`);
    const translations = loadTranslations(lang);
    const missingKeys = keys.filter((key) => !(key in translations));

    if (missingKeys.length === 0) {
      console.log(`✅ All keys are already present in ${lang}.json`);
      continue;
    }

    for (const key of missingKeys) {
      let translated = "";
      if (lang === "en") {
        // لو اللغة انجليزي خلي القيمة = المفتاح نفسه
        translated = key;
      } else {
        // ترجم للنهاية المطلوبة
        translated = await translateText(key, lang);
      }
      translations[key] = translated || "";
    }

    saveTranslations(lang, translations);
    console.log(`✅ Updated file: ${lang}.json`);
  }

  console.log("\n🎉 All done!");
})();
