export default {
    plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-svelte"],
    overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
    tabWidth: 4,
    useTabs: false,
};
