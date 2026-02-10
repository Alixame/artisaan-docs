import { NextRequest, NextResponse } from "next/server"

type FileInput = {
    path: string
    typeCode: string
    code: string
}

type AIRequest = {
    mode: "docs" | "tests"
    project: {
        language: string
        framework: string
    }
    entry: string
    files: FileInput[]
}

/* =========================
   SYSTEM PROMPTS
========================= */

const SYSTEM_TEST_PROMPT = `
Você é um engenheiro de software sênior especializado em testes automatizados.

REGRAS ABSOLUTAS:
- Gere APENAS código de teste.
- NÃO explique nada.
- NÃO gere markdown.
- NÃO gere texto fora do código.
- Use o framework de testes nativo do projeto.
- Mocke dependências externas.
- Cubra casos de sucesso, erro e edge cases.
- Gere testes realistas, executáveis e completos.
- Se não existir estrutura de testes, crie.
- Se precisar de setup/bootstrap, gere.

Retorne SOMENTE o código final.
`

const SYSTEM_DOC_PROMPT = `
Você é um engenheiro de software sênior especializado em documentação técnica.
Gere documentação clara, objetiva e técnica.
`

/* =========================
   PROMPT BUILDER
========================= */

function buildPrompt(payload: AIRequest): string {
    const entryFile =
        payload.files.find(f => f.path === payload.entry) ||
        payload.files[0]

    const relatedFiles = payload.files
        .filter(f => f.path !== entryFile.path)
        .map(
            f =>
                `### ${f.path}\n\`\`\`${f.typeCode}\n${f.code}\n\`\`\``
        )
        .join("\n\n")

    return `
PROJETO:
- Linguagem: ${payload.project.language}
- Framework: ${payload.project.framework}

ARQUIVO PRINCIPAL:
${entryFile.path}

CÓDIGO PRINCIPAL:
\`\`\`${entryFile.typeCode}
${entryFile.code}
\`\`\`

ARQUIVOS RELACIONADOS:
${relatedFiles}

TAREFA:
${payload.mode === "tests"
        ? `
Crie testes unitários completos para o fluxo acima.
- Identifique dependências
- Crie mocks
- Cubra falhas de autenticação, validações e sucesso
- Use boas práticas do ecossistema
`
        : `
Gere documentação técnica detalhada.
`}
`
}

/* =========================
   LLM CALL (DeepSeek)
========================= */

async function callDeepSeek(system: string, prompt: string) {
    const body = JSON.stringify({
        model: "deepseek-chat",
        messages: [
            { role: "system", content: system },
            { role: "user", content: prompt },
        ],
        temperature: 0,
        top_p: 1,
        max_tokens: 8000,
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
        throw new Error(
            `DeepSeek error ${resp.status}: ${resp.statusText}`
        )
    }

    const json = await resp.json()
    return json?.choices?.[0]?.message?.content ?? ""
}

/* =========================
   ROUTES
========================= */

export async function GET() {
    return NextResponse.json(
        { message: "Artisaan AI API is running." },
        { status: 200 }
    )
}

export async function POST(req: NextRequest) {
    try {
        const payload = (await req.json()) as AIRequest

        if (!payload.mode || !payload.files?.length) {
            return NextResponse.json(
                { error: "Payload inválido." },
                { status: 400 }
            )
        }

        const prompt = buildPrompt(payload)

        const systemPrompt =
            payload.mode === "tests"
                ? SYSTEM_TEST_PROMPT
                : SYSTEM_DOC_PROMPT

        const output = await callDeepSeek(systemPrompt, prompt)

        return NextResponse.json(
            {
                mode: payload.mode,
                entry: payload.entry,
                output,
            },
            { status: 200 }
        )
    } catch (e) {
        console.error("Erro em /api/cli/ai:", e)
        return NextResponse.json(
            { error: "Erro interno ao processar IA." },
            { status: 500 }
        )
    }
}
