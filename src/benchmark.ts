import Benchmark from "benchmark";
import {ESLint} from "eslint";
import acorn from "acorn";
import {simple} from "acorn-walk"

export const benchmark = () => {
    const suite = new Benchmark.Suite()
    const testCode = `
    const isActive = state.currentActiveCategory.id === currentCategory.id
    const opacity = isActive ? 0.5 : 1
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
            simple(ast, {
                Literal(node) {
                    if (node.type == "operator") return false;
                },
            });
        })
        .on("cycle", (event: Event) => {
            console.log(String(event.target));
        })
        .run({async: false});
};
