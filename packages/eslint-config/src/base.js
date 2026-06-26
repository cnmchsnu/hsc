import js from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

/*
|--------------------------------------------------------------------------
| BASE ESLINT CONFIG
|--------------------------------------------------------------------------
| Scope:
| - JavaScript correctness
| - TypeScript correctness
| - Import hygiene
| - General bug prevention
|--------------------------------------------------------------------------
*/

export default [
    /*
    |--------------------------------------------------------------------------
    | JavaScript Recommended Rules
    |--------------------------------------------------------------------------
    */
    js.configs.recommended,

    /*
    |--------------------------------------------------------------------------
    | TypeScript Base Rules
    |--------------------------------------------------------------------------
    */
    ...tseslint.configs.recommended,

    {
        files: ["**/*.{ts,tsx,js,jsx}"],

        languageOptions: {
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },

        plugins: {
            import: importPlugin,
        },

        rules: {
            /*
            |--------------------------------------------------------------------------
            | Code Safety
            |--------------------------------------------------------------------------
            */

            "no-console": "warn",
            "no-debugger": "error",

            "no-undef": "off", // TS already handles this
            "no-unused-vars": "off", // TS handles better version

            /*
            |--------------------------------------------------------------------------
            | TypeScript Safety
            |--------------------------------------------------------------------------
            */

            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                },
            ],

            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/consistent-type-imports": "error",

            /*
            |--------------------------------------------------------------------------
            | Code Quality
            |--------------------------------------------------------------------------
            */

            "eqeqeq": ["error", "always"],
            "curly": ["error", "all"],

            "prefer-const": "error",
            "no-var": "error",

            /*
            |--------------------------------------------------------------------------
            | Import Hygiene
            |--------------------------------------------------------------------------
            */

            "import/no-duplicates": "error",
            "import/order": [
                "error",
                {
                    "groups": [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index",
                    ],

                    "alphabetize": {
                        order: "asc",
                        caseInsensitive: true,
                    },
                },
            ],

            "import/no-unresolved": "off", // TS handles this better
        },
    },
];