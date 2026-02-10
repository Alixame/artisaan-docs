// import { NextRequest, NextResponse } from "next/server"

// /* =======================
//  * Tipos
//  * ======================= */

// type FileInput = {
//     path: string
//     typeCode: string // rust | ts | js | py | etc
//     code: string
// }

// type TestFile = {
//     path: string
//     content: string
// }

// type AIResponse = {
//     files: TestFile[]
// }

// /* =======================
//  * Prompt
//  * ======================= */

// const SYSTEM_PROMPT = `
// Você é um gerador profissional de testes automatizados.

// Sua missão é gerar testes reais, úteis e completos para o código fornecido.

// 📌 REGRAS ABSOLUTAS
// - Retorne APENAS JSON válido
// - NÃO explique nada
// - NÃO use Markdown
// - NÃO use comentários fora do código
// - NÃO gere testes genéricos ou "it_works"

// 📌 FORMATO DE SAÍDA (OBRIGATÓRIO)

// {
//   "files": [
//     {
//       "path": "<caminho do arquivo de teste>",
//       "content": "<conteúdo completo do teste>"
//     }
//   ]
// }

// 📌 REGRAS DE PATH POR LINGUAGEM

// Rust:
// - src/foo/bar.rs → tests/foo/bar_test.rs
// - NÃO usar #[cfg(test)]
// - Usar testes de integração sempre que possível

// TypeScript / JavaScript:
// - src/foo.ts → src/foo.test.ts

// Python:
// - foo/bar.py → tests/foo/test_bar.py

// 📌 QUALIDADE DOS TESTES
// - Cobrir casos válidos e inválidos
// - Usar asserts reais
// - Seguir boas práticas da linguagem

// 📌 SE NÃO FOR POSSÍVEL GERAR TESTES
// Retorne:
// {
//   "files": []
// }
// `

// /* =======================
//  * Utils
//  * ======================= */

// function normalizeTestPath(
//     sourcePath: string,
//     language: string
// ): string {
//     if (language === "rust") {
//         return sourcePath
//             .replace(/^src\//, "tests/")
//             .replace(/\.rs$/, "_test.rs")
//     }

//     if (language === "ts" || language === "js") {
//         return sourcePath.replace(/\.(ts|js)$/, ".test.$1")
//     }

//     if (language === "py") {
//         const parts = sourcePath.split("/")
//         const file = parts.pop()!
//         return ["tests", ...parts, `test_${file}`].join("/")
//     }

//     return sourcePath
// }

// /* =======================
//  * AI Call
//  * ======================= */

// async function generateTestsForFile(
//     file: FileInput
// ): Promise<TestFile[]> {
//     const messages = [
//         {
//             role: "system",
//             content: SYSTEM_PROMPT,
//         },
//         {
//             role: "user",
//             content: `
// Linguagem: ${file.typeCode}

// Arquivo original:
// Path: ${file.path}

// Código:
// \`\`\`${file.typeCode}
// ${file.code}
// \`\`\`
// `,
//         },
//     ]

//     const body = JSON.stringify({
//         model: "deepseek-chat",
//         messages,
//         temperature: 0,
//         top_p: 1,
//         max_tokens: 6000,
//         stream: false,
//     })

//     const resp = await fetch(
//         `${process.env.API_AI_URL}/v1/chat/completions`,
//         {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${process.env.API_AI_KEY}`,
//             },
//             body,
//         }
//     )

//     if (!resp.ok) {
//         console.error("Erro IA:", resp.status, resp.statusText)
//         return []
//     }

//     const json = await resp.json()
//     const content = json?.choices?.[0]?.message?.content

//     if (!content) return []

//     let parsed: AIResponse

//     try {
//         parsed = JSON.parse(content)
//     } catch (err) {
//         console.error("JSON inválido da IA:", content)
//         return []
//     }

//     if (!Array.isArray(parsed.files)) return []

//     return parsed.files.map((f) => ({
//         path: f.path || normalizeTestPath(file.path, file.typeCode),
//         content: f.content,
//     }))
// }

// /* =======================
//  * Handlers
//  * ======================= */

// export async function GET(): Promise<Response> {
//     return NextResponse.json(
//         { message: "API de geração de testes (IA) ativa." },
//         { status: 200 }
//     )
// }

// export async function POST(req: NextRequest): Promise<Response> {
//     try {
//         const body = await req.json()
//         const files: FileInput[] = body?.files || []

//         if (!Array.isArray(files) || files.length === 0) {
//             return NextResponse.json(
//                 { error: "Nenhum arquivo fornecido." },
//                 { status: 400 }
//             )
//         }

//         const results = await Promise.all(
//             files.map((file) => generateTestsForFile(file))
//         )

//         return NextResponse.json(
//             {
//                 files: results.flat(),
//             },
//             { status: 200 }
//         )
//     } catch (err) {
//         console.error("Erro em /api/cli/ia:", err)
//         return NextResponse.json(
//             { error: "Erro interno ao gerar testes." },
//             { status: 500 }
//         )
//     }
// }

import { NextRequest, NextResponse } from "next/server"

type AIFileInput = {
    path: string
    code: string
}

type AIPayload = {
    mode: "tests"
    language: string
    entry?: string
    files: AIFileInput[]
}

type AIFileOutput = {
    path: string
    content: string
}

const SYSTEM_PROMPT_TESTS = `
Você é um engenheiro de software sênior especialista em testes automatizados.

OBJETIVO
Gerar testes unitários REALISTAS e EXECUTÁVEIS
EXCLUSIVAMENTE para o arquivo fornecido.

REGRAS ABSOLUTAS (NÃO QUEBRE)
- Teste APENAS funções, structs, enums e métodos DEFINIDOS NESTE ARQUIVO
- NÃO testar código de outros módulos
- NÃO criar testes de integração
- NÃO mockar HTTP, filesystem ou rede, a menos que ESTE ARQUIVO faça isso diretamente
- NÃO criar helpers, mocks ou structs que não existam no arquivo
- NÃO assumir comportamento externo
- NÃO importar crates que não são usados diretamente pelo arquivo

SE O ARQUIVO:
- só contém structs → testar construção, defaults, validação
- só contém funções puras → testar entradas e saídas
- só contém lógica simples → testar bordas e invariantes
- não tem comportamento testável → gerar testes mínimos de contrato público

ESTILO
- Testes pequenos
- Um teste por comportamento
- Nomes descritivos
- Idiomático da linguagem

FORMATO
- Retornar APENAS código de teste
- Código compilável
- Sem explicações
- Sem codeblock
`

function resolveTestPath(sourcePath: string, language: string): string {
    const name =
        sourcePath.split("/").pop()?.split(".")[0] ?? "module"

    switch (language) {
        case "rust":
            return `tests/${name}_test.rs`
        case "typescript":
        case "javascript":
            return `tests/${name}.spec.ts`
        case "php":
            return `tests/${name}Test.php`
        default:
            return `tests/${name}.test`
    }
}

async function generateTestsForFile(
    file: AIFileInput,
    payload: AIPayload
): Promise<AIFileOutput> {
    const messages = [
        {
            role: "system",
            content: SYSTEM_PROMPT_TESTS,
        },
        {
            role: "user",
            content: `
Linguagem: ${payload.language}
Arquivo de entrada: ${payload.entry ?? file.path}

Código-fonte:
\`\`\`${payload.language}
${file.code}
\`\`\`
`,
        },
    ]

    const body = JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature: 0,
        top_p: 1,
        max_tokens: 8000,
        stream: false,
    })

    const resp = await fetch(`${process.env.API_AI_URL}/v1/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_AI_KEY}`,
        },
        body,
    })

    if (!resp.ok) {
        const text = await resp.text()
        throw new Error(
            `DeepSeek error ${resp.status}: ${text}`
        )
    }

    const json = await resp.json()

    const content =
        json?.choices?.[0]?.message?.content?.trim()

    if (!content) {
        throw new Error("Empty AI response")
    }

    return {
        path: resolveTestPath(file.path, payload.language),
        content,
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as AIPayload

        if (body.mode !== "tests") {
            return NextResponse.json(
                { error: "Invalid mode" },
                { status: 400 }
            )
        }

        if (!Array.isArray(body.files) || body.files.length === 0) {
            return NextResponse.json(
                { error: "files[] is required" },
                { status: 400 }
            )
        }

        const results: AIFileOutput[] = []

        for (const file of body.files) {
            const generated = await generateTestsForFile(file, body)
            results.push(generated)
        }

        return NextResponse.json(
            { files: results },
            { status: 200 }
        )
    } catch (err) {
        console.error("[/api/cli/ai ERROR]", err)

        return NextResponse.json(
            {
                error: "AI test generation failed",
                message:
                    err instanceof Error
                        ? err.message
                        : "unknown error",
            },
            { status: 500 }
        )
    }
}
