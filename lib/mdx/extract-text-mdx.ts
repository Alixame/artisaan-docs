/* eslint-disable @typescript-eslint/no-explicit-any */

// Extrai texto de qualquer árvore React/MDX (string, fragmento, span, code, etc)
export function extractTextFromMdx(node: any): string {
    if (node == null || typeof node === "boolean") return "";

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

    // alguns nós MDX podem vir com "children" direto
    if (typeof node === "object" && "children" in node) {
        return extractTextFromMdx(node.children);
    }

    // fallback para nós com valor textual explícito
    if (
        typeof node === "object" &&
        "value" in node &&
        (typeof node.value === "string" || typeof node.value === "number")
    ) {
        return String(node.value);
    }

    // fallback profundo para formatos MDX não padronizados.
    if (typeof node === "object") {
        return Object.values(node).map(extractTextFromMdx).join("");
    }

    return "";
}
