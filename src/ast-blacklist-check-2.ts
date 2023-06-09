import acorn, {Node as ANode} from "acorn";
import {simple} from "acorn-walk";

export type BlackListRule = { [id: string]: unknown }
// Sample rule
// const blacklistRule = {
//     type: "UnaryExpression",
//     operator: "!",
//     argument: {
//         type: "ArrayExpression",
//         elements: []
//     }
// }


export const isSafe = (ast: ANode, rule: BlackListRule): boolean => {
    let result = true
    simple(ast, {
        Expression: (node: ANode) => {
            result = result && !isMatch(node, rule)
        }
    })
    return result
}


const isMatch = (node: ANode, rule: BlackListRule): boolean => {
    for (const key in rule) {
        if (typeof node[key] === "object" && typeof rule[key] === "object") {
            if (!isMatch(node[key], rule[key] as BlackListRule)) {
                return false
            }
        } else if (node[key] !== rule[key]) {
            return false
        }
    }
    return true
}
