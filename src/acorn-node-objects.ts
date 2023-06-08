import {Node as ANode} from "acorn";
import {BinaryExpression, Identifier, MemberExpression, VariableDeclarator} from "estree";

// export interface AMemberExpression extends MemberExpression, ANode{
//     readonly type: "MemberExpression"
//     readonly object: ANode
//     readonly property: ANode
// }

export const isMemberExpression = (node: unknown): node is MemberExpression  => {
    return node["type"] === "MemberExpression"
}

// export interface Identifier extends ANode {
//     readonly type: "Identifier"
//     readonly name: string
// }

export const isIdentifier = (node: unknown): node is Identifier => {
    return node["type"] === "Identifier"
}

export const isVariableDeclarator = (node: unknown): node is VariableDeclarator => {
    return node["type"] === "VariableDeclarator"
}

export const isBinaryExpression = (node: unknown): node is BinaryExpression => {
    return node["type"] === "BinaryExpression"
}

