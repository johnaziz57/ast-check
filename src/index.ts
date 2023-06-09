import acorn from "acorn";
import {isSafe} from "./ast-blacklist-check-2";

const testCode = `
    const y = ![]
    `;

//
const blacklistRule = {
    type: "UnaryExpression",
    operator: "!",
    argument: {
        type: "ArrayExpression",
        elements: []
    }
}

const ast = acorn.parse(testCode, {ecmaVersion: 2020, ranges: true});
console.log(`result: ${isSafe(ast, blacklistRule)}`)
