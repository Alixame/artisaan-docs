/* eslint-disable @typescript-eslint/no-explicit-any */

// Extrai texto de qualquer árvore React/MDX (string, fragmento, span, code, etc)
export function extractTextFromMdx(node: any): string {
    if (node == null) return "";

    // caso seja string ou número
    if (typeof node === "string" || typeof node === "number") {
        return String(node);
    }

    // caso seja array (lista de children)
    if (Array.isArray(node)) {
        return node.map(extractTextFromMdx).join("");
    }

    // caso seja um React element (tem props e children)
    if (typeof node === "object" && node.props) {
        return extractTextFromMdx(node.props.children);
    }

    return "";
}
