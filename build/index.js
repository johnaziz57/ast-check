"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var acorn_1 = __importDefault(require("acorn"));
var acorn_walk_1 = __importDefault(require("acorn-walk"));
console.log("Hello World!");
/*const benchmark = () => {
    const suite = new Benchmark.Suite()
    const testCode = `
    const isActive = state.currentActiveCategory.id === currentCategory.id
    const opacity = isActive ? 0.5 : 1

    return {isActive, opacity}
`;
    const eslint = new ESLint({
        useEslintrc: false,
        overrideConfig: {
            extends: ["plugin:security/recommended"],
            parserOptions: {
                sourceType: "module",
                ecmaVersion: "latest",
            },
            env: {
                node: true,
            },
        },
    });
    suite
        .add("run eslint on sample state update".padEnd(30, " "), () => {
            (async function main() {
                // 2. Lint text.
                const results = await eslint.lintText(testCode);

                // 3. Format the results.
                const formatter = await eslint.loadFormatter("stylish");
                // 4. Output it.
                return formatter.format(results);
            })();
        })
        .add("run ast".padEnd(30, " "), () => {
            const ast = acorn.parse(testCode, {ecmaVersion: 2020, ranges: true});
            walk.simple(ast, {
                Literal(node) {
                },
            });
        })
        .on("cycle", (event: Event) => {
            console.log(String(event.target));
        })
        .run({async: false});
};

benchmark()*/
var testCode = "\n    const isActive = state.currentActiveCategory.id === currentCategory.id\n    const opacity = isActive ? 0.5 : 1\n    \n    return {isActive, opacity} \n";
var ast = acorn_1.default.parse(testCode, { ecmaVersion: 2020, ranges: true });
acorn_walk_1.default.simple(ast, {
    Literal: function (node) {
    },
});
