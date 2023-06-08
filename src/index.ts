import {benchmark} from "./benchmark";
import acorn from "acorn";
import {isValid} from "./ast-tree-check";

console.log("Hello World!")

const testCode = `
    const y = z + 1
    `;

const ast = acorn.parse(testCode, {ecmaVersion: 2020, ranges: true});
console.log(`result: ${isValid(ast)}`)
