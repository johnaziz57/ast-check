import acorn, {Node as ANode} from "acorn";
import {simple} from "acorn-walk";
import {
    isBinaryExpression,
    isIdentifier,
    isMemberExpression,
    isVariableDeclarator,
} from "./acorn-node-objects";
import {BinaryExpression, Expression, Identifier, Literal, MemberExpression, VariableDeclarator} from "estree";


const whitelist: string[] = ["state"]

export const isValid = (ast: acorn.Node): boolean => {
    let result = true
    simple(ast, {
        VariableDeclarator: (node: ANode) => {
            if (isVariableDeclarator(node)) {
                result = result && isValidVariableDeclarator(node)
            }
        },
        MemberExpression: (node: ANode) => {
            if (isMemberExpression(node)) {
                result = result && isValidMemberExpression(node)
            }
        }
    })
    return result
}

const isValidExpression = (node: Expression): boolean => {
    let result = true
    if (isMemberExpression(node)) {
        return isValidMemberExpression(node)
    }

    if (isBinaryExpression(node)) {
        return isValidBinaryExpression(node)
    }

    if (isIdentifier(node)) {
        return isValidIdentifier(node)
    }
}
const isValidMemberExpression = (node: MemberExpression): boolean => {
    let result = true;
    const {object} = node
    if (isMemberExpression(object)) {
        result = isValidMemberExpression(object)
    } else if (isIdentifier(object)) {
        result = isValidIdentifier(object)
    }

    const property = node["property"]

    if (isMemberExpression(property)) {
        result = result && isValidMemberExpression(property)
    }
    return result
}

const isValidIdentifier = (node: Identifier): boolean => {
    return whitelist.includes(node.name, 0)
}

const isValidBinaryExpression = (node: BinaryExpression): boolean => {
    let result = true
    const {left, right} = node
    return isValidExpression(left) && isValidExpression(right)
}

const isValidVariableDeclarator = (node: VariableDeclarator): boolean => {
    const init = node.init
    let result = true
    if (isMemberExpression(init)) {
        result = isValidMemberExpression(init)
    } else if (isIdentifier(init)) {
        result = isValidIdentifier(init)
    } else if (isBinaryExpression(init)) {
        result = isValidBinaryExpression(init)
    }
    handleVariableDeclaratorIdentifier(node.id as Identifier)
    return result
}

const handleVariableDeclaratorIdentifier = (node: Identifier) => {
    whitelist.push(node.name)
}
