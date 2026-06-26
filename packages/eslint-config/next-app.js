import base from "./src/base.js";
import react from "./src/react.js";
import next from "./src/next.js";
import i18n from "./src/i18n.js";

export default [
    base,
    react,
    next,

    {
        files: [
            "**/*.{ts,tsx}"
        ],

        ...i18n
    }
];