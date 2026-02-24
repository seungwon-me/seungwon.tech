import { dirname } from "path";
import { fileURLToPath } from "url";
import * as eslintrcPkg from "@eslint/eslintrc";

const FlatCompat = eslintrcPkg.FlatCompat ?? eslintrcPkg.default?.FlatCompat;

if (!FlatCompat) {
  throw new Error("FlatCompat export not found in @eslint/eslintrc");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
