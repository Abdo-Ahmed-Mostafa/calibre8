import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // هنا تضيف قواعد جديدة أو تعدل قواعد موجودة
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "@typescript-eslint/no-explicit-any": "off", // تعطيل تحذير استخدام any
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ], // تحذير بدل خطأ مع تجاهل المتغيرات اللي بتبدأ بـ _
      // تقدر تضيف قواعد تانية حسب الحاجة
    },
  },
];

export default eslintConfig;
