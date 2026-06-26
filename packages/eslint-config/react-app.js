import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

/*
|--------------------------------------------------------------------------
| React App ESLint Base Config
|--------------------------------------------------------------------------
| - JSX correctness
| - Hooks rules
| - Accessibility baseline
| - UI safety rules (non-i18n)
|--------------------------------------------------------------------------
*/

export default [
    /*
    |--------------------------------------------------------------------------
    | React Core Plugin
    |--------------------------------------------------------------------------
    */
    {
        plugins: {
            react,
        },

        settings: {
            react: {
                version: "detect",
            },
        },

        rules: {
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",

            "react/prop-types": "off",

            "react/display-name": "off",

            // 基本 JSX 品質
            "react/jsx-key": "error",
            "react/jsx-no-duplicate-props": "error",
            "react/jsx-no-undef": "error",
            "react/no-children-prop": "error",
            "react/self-closing-comp": "warn",
        },
    },

    /*
    |--------------------------------------------------------------------------
    | React Hooks Rules
    |--------------------------------------------------------------------------
    */
    {
        plugins: {
            "react-hooks": reactHooks,
        },

        rules: {
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
        },
    },

    /*
    |--------------------------------------------------------------------------
    | Accessibility (a11y)
    |--------------------------------------------------------------------------
    */
    {
        plugins: {
            "jsx-a11y": jsxA11y,
        },

        rules: {
            "jsx-a11y/alt-text": "error",
            "jsx-a11y/aria-role": "warn",
            "jsx-a11y/aria-props": "warn",
            "jsx-a11y/no-autofocus": "warn",
            "jsx-a11y/click-events-have-key-events": "warn",
        },
    },

    /*
    |--------------------------------------------------------------------------
    | UI Safety Rules (non-i18n)
    |--------------------------------------------------------------------------
    | 這裡只管 UI 結構，不管語系
    |--------------------------------------------------------------------------
    */
    {
        rules: {
            // 防止空 JSX
            "react/jsx-no-useless-fragment": "warn",

            // 避免 inline function 爆炸（大型專案建議）
            "react/jsx-no-bind": [
                "warn",
                {
                    allowArrowFunctions: true,
                },
            ],

            // 禁止 dangerouslySetInnerHTML（安全性）
            "react/no-danger": "error",
        },
    },
];