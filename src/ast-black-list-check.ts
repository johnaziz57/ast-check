import acorn, {Node as ANode} from "acorn";
import {simple} from "acorn-walk";


// Trying building the rule as an AST tree as well
// It the defined rules from AST has some extra defining properties such as `range`, `end` and `start`
// that will not match depending on where that part of the code being checked is


/*
// Testing code for index.ts
 const testCode = `
    const y = ![]
    `;

const ruleAst = acorn.parse("![]", {ecmaVersion: 2020, ranges: true})
// @ts-ignore
const ruleExpressionNode = ((ruleAst as Program).body[0] as ExpressionStatement).expression as ANode
* */



export const isSafe = (ast: ANode, ruleNode: ANode): boolean => {
    let result = true
    simple(ast, {
        Expression: (node: ANode) => {
            result = result && !isMatch(node, ruleNode)
        }
    })
    return result
}


const isMatch = (node: ANode, ruleNode: ANode): boolean => {
    for (const key in ruleNode) {
        if (key === "arguments" || key === "start" || key === "end") continue
        if (node[key] !== ruleNode[key]) return false
        if (typeof node[key] === "object") {
            if (!isMatch(node[key], ruleNode[key])) return false
        }
    }
    return true
}
