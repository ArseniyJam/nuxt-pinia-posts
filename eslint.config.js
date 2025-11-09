// eslint.config.js
import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
   {
      files: [
         "app/**/*.{js,ts,vue}",
         "components/**/*.{js,ts,vue}",
         "pages/**/*.{js,ts,vue}",
         "composables/**/*.{js,ts,vue}",
         "stores/**/*.{js,ts,vue}",
         "layouts/**/*.{js,ts,vue}",
      ],
      ignores: [".output/**", ".nuxt/**", "node_modules/**", "dist/**"],
      languageOptions: {
         parser: vueParser, // 👈 обязательный парсер для .vue
         parserOptions: {
            parser: tseslint.parser, // 👈 обрабатывает <script lang="ts">
            ecmaVersion: "latest",
            sourceType: "module",
            extraFileExtensions: [".vue"],
         },
         globals: {
            ...globals.browser,
            ...globals.node,
            defineNuxtConfig: "readonly",
            definePageMeta: "readonly",
            useAsyncData: "readonly",
            useFetch: "readonly",
            useState: "readonly",
            ref: "readonly",
            computed: "readonly",
            watch: "readonly",
         },
      },
      plugins: {
         vue: pluginVue,
         "@typescript-eslint": tseslint.plugin,
      },
      extends: [
         js.configs.recommended,
         ...tseslint.configs.recommended,
         pluginVue.configs["flat/essential"],
      ],
      rules: {
         "no-unused-vars": "off",
         "no-undef": "off",
         "vue/multi-word-component-names": "off",
         "vue/no-multiple-template-root": "off",
      },
   },
]);
