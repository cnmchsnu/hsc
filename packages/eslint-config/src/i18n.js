import i18next from "eslint-plugin-i18next";

/*
|--------------------------------------------------------------------------
| Constants
|--------------------------------------------------------------------------
*/

const KEY_REGEX = /^[a-z]+(\.[a-z]+)+$/;

const JSX_TEXT_PROPS = [
    "placeholder",
    "title",
    "label",
    "helperText",
    "description",
    "tooltip",
    "aria-label",
];

const WHITELIST = [
    "API",
    "OAuth",
    "JWT",
    "UUID",
    "CSV",
    "PDF",
    "URL",
    "HTTP",
    "HTTPS",
    "ID",
];

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function isChinese(text) {
    return /[\u4e00-\u9fff]/.test(text);
}

function isWhitelisted(text) {
    return WHITELIST.includes(text);
}

/*
|--------------------------------------------------------------------------
| Rule: no-user-visible-string
|--------------------------------------------------------------------------
*/

const noUserVisibleString = {
    meta: {
        type: "problem",
        docs: {
            description:
                "Disallow hardcoded user visible strings",
        },
    },

    create(context) {
        return {
            Literal(node) {
                if (typeof node.value !== "string")
                    return;

                const text = node.value.trim();

                if (!text) return;

                if (isWhitelisted(text))
                    return;

                if (!isChinese(text))
                    return;

                context.report({
                    node,
                    message:
                        "User visible text must use i18n key.",
                });
            },
        };
    },
};

/*
|--------------------------------------------------------------------------
| Rule: no-hardcoded-toast
|--------------------------------------------------------------------------
*/

const noHardcodedToast = {
    meta: {
        type: "problem",
    },

    create(context) {
        return {
            CallExpression(node) {
                const callee = node.callee;

                if (
                    callee.type !==
                    "MemberExpression"
                )
                    return;

                if (
                    callee.object?.name !==
                    "toast"
                )
                    return;

                const firstArg =
                    node.arguments[0];

                if (
                    firstArg?.type ===
                    "Literal"
                ) {
                    context.report({
                        node,
                        message:
                            "Toast message must use i18n.",
                    });
                }
            },
        };
    },
};

/*
|--------------------------------------------------------------------------
| Rule: no-hardcoded-dialog
|--------------------------------------------------------------------------
*/

const noHardcodedDialog = {
    meta: {
        type: "problem",
    },

    create(context) {
        return {
            CallExpression(node) {
                if (
                    node.callee.type !==
                    "Identifier"
                )
                    return;

                const fn =
                    node.callee.name;

                if (
                    ![
                        "alert",
                        "confirm",
                        "prompt",
                    ].includes(fn)
                )
                    return;

                const firstArg =
                    node.arguments[0];

                if (
                    firstArg?.type ===
                    "Literal"
                ) {
                    context.report({
                        node,
                        message:
                            `${fn} message must use i18n.`,
                    });
                }
            },
        };
    },
};

/*
|--------------------------------------------------------------------------
| Rule: no-hardcoded-jsx-props
|--------------------------------------------------------------------------
*/

const noHardcodedJsxProps = {
    meta: {
        type: "problem",
    },

    create(context) {
        return {
            JSXAttribute(node) {
                const name =
                    node.name?.name;

                if (
                    !JSX_TEXT_PROPS.includes(
                        name
                    )
                )
                    return;

                if (
                    node.value?.type ===
                    "Literal"
                ) {
                    context.report({
                        node,
                        message:
                            `${name} must use i18n.`,
                    });
                }
            },
        };
    },
};

/*
|--------------------------------------------------------------------------
| Rule: enforce-key-format
|--------------------------------------------------------------------------
*/

const enforceKeyFormat = {
    meta: {
        type: "problem",
    },

    create(context) {
        return {
            CallExpression(node) {
                if (
                    node.callee.type !==
                    "Identifier"
                )
                    return;

                if (
                    node.callee.name !== "t"
                )
                    return;

                const arg =
                    node.arguments[0];

                if (
                    !arg ||
                    arg.type !== "Literal"
                )
                    return;

                const key =
                    String(arg.value);

                if (
                    !KEY_REGEX.test(key)
                ) {
                    context.report({
                        node,
                        message:
                            "i18n key must follow domain.feature.element format.",
                    });
                }
            },
        };
    },
};

/*
|--------------------------------------------------------------------------
| Export Config
|--------------------------------------------------------------------------
*/

export default {
    plugins: {
        i18next,

        i18n: {
            rules: {
                "no-user-visible-string":
                    noUserVisibleString,

                "no-hardcoded-toast":
                    noHardcodedToast,

                "no-hardcoded-dialog":
                    noHardcodedDialog,

                "no-hardcoded-jsx-props":
                    noHardcodedJsxProps,

                "enforce-key-format":
                    enforceKeyFormat,
            },
        },
    },

    rules: {
        /*
         * JSX Literal String
         */

        "i18next/no-literal-string": [
            "error",
            {
                markupOnly: true,

                ignoreAttribute: [
                    "className",
                    "id",
                    "href",
                    "src",
                    "target",
                    "rel",

                    "variant",
                    "size",
                    "type",
                    "color",

                    "role",
                    "name",
                    "value",

                    "key",

                    "data-testid",

                    "aria-hidden",
                ],
            },
        ],

        /*
         * Custom Rules
         */

        "i18n/no-user-visible-string":
            "error",

        "i18n/no-hardcoded-toast":
            "error",

        "i18n/no-hardcoded-dialog":
            "error",

        "i18n/no-hardcoded-jsx-props":
            "error",

        "i18n/enforce-key-format":
            "error",
    },
};