import { NextRequest, NextResponse } from "next/server"

/* =======================
 * Tipos
 * ======================= */

type FileInput = {
    path: string
    typeCode: string // rust | ts | js | py | etc
    code: string
}

type TestFile = {
    path: string
    content: string
}

type AIResponse = {
    files: TestFile[]
}

/* =======================
 * Prompt
 * ======================= */

const SYSTEM_PROMPT = `
Você é um gerador profissional de testes automatizados.

Sua missão é gerar testes reais, úteis e completos para o código fornecido.

📌 REGRAS ABSOLUTAS
- Retorne APENAS JSON válido
- NÃO explique nada
- NÃO use Markdown
- NÃO use comentários fora do código
- NÃO gere testes genéricos ou "it_works"

📌 FORMATO DE SAÍDA (OBRIGATÓRIO)

{
  "files": [
    {
      "path": "<caminho do arquivo de teste>",
      "content": "<conteúdo completo do teste>"
    }
  ]
}

📌 REGRAS DE PATH POR LINGUAGEM

Rust:
- src/foo/bar.rs → tests/foo/bar_test.rs
- NÃO usar #[cfg(test)]
- Usar testes de integração sempre que possível

TypeScript / JavaScript:
- src/foo.ts → src/foo.test.ts

Python:
- foo/bar.py → tests/foo/test_bar.py

📌 QUALIDADE DOS TESTES
- Cobrir casos válidos e inválidos
- Usar asserts reais
- Seguir boas práticas da linguagem

📌 SE NÃO FOR POSSÍVEL GERAR TESTES
Retorne:
{
  "files": []
}
`

/* =======================
 * Utils
 * ======================= */

function normalizeTestPath(
    sourcePath: string,
    language: string
): string {
    if (language === "rust") {
        return sourcePath
            .replace(/^src\//, "tests/")
            .replace(/\.rs$/, "_test.rs")
    }

    if (language === "ts" || language === "js") {
        return sourcePath.replace(/\.(ts|js)$/, ".test.$1")
    }

    if (language === "py") {
        const parts = sourcePath.split("/")
        const file = parts.pop()!
        return ["tests", ...parts, `test_${file}`].join("/")
    }

    return sourcePath
}

/* =======================
 * AI Call
 * ======================= */

async function generateTestsForFile(
    file: FileInput
): Promise<TestFile[]> {
    const messages = [
        {
            role: "system",
            content: SYSTEM_PROMPT,
        },
        {
            role: "user",
            content: `
Linguagem: ${file.typeCode}

Arquivo original:
Path: ${file.path}

Código:
\`\`\`${file.typeCode}
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
        max_tokens: 6000,
        stream: false,
    })

    const resp = await fetch(
        `${process.env.API_AI_URL}/v1/chat/completions`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.API_AI_KEY}`,
            },
            body,
        }
    )

    if (!resp.ok) {
        console.error("Erro IA:", resp.status, resp.statusText)
        return []
    }

    const json = await resp.json()
    const content = json?.choices?.[0]?.message?.content

    if (!content) return []

    let parsed: AIResponse

    try {
        parsed = JSON.parse(content)
    } catch (err) {
        console.error("JSON inválido da IA:", content)
        return []
    }

    if (!Array.isArray(parsed.files)) return []

    return parsed.files.map((f) => ({
        path: f.path || normalizeTestPath(file.path, file.typeCode),
        content: f.content,
    }))
}

/* =======================
 * Handlers
 * ======================= */

export async function GET(): Promise<Response> {
    return NextResponse.json(
        { message: "API de geração de testes (IA) ativa." },
        { status: 200 }
    )
}

export async function POST(req: NextRequest): Promise<Response> {
    try {
        const body = await req.json()
        const files: FileInput[] = body?.files || []

        if (!Array.isArray(files) || files.length === 0) {
            return NextResponse.json(
                { error: "Nenhum arquivo fornecido." },
                { status: 400 }
            )
        }

        const results = await Promise.all(
            files.map((file) => generateTestsForFile(file))
        )

        return NextResponse.json(
            {
                files: results.flat(),
            },
            { status: 200 }
        )
    } catch (err) {
        console.error("Erro em /api/cli/ia:", err)
        return NextResponse.json(
            { error: "Erro interno ao gerar testes." },
            { status: 500 }
        )
    }
}
