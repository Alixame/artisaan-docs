import { NextRequest, NextResponse } from "next/server"

type AIFile = {
    path: string
    code: string
}

type AIPayload = {
    mode: "tests"
    language: string
    entry: string
    files: AIFile[]
    config?: Record<string, unknown>
}

export async function POST(req: NextRequest) {
    const SYSTEM_PROMPT_TESTS = `
Você é um engenheiro de software sênior especialista em testes automatizados.

Sua missão:
- Gerar testes automatizados completos e executáveis
- Seguir os padrões idiomáticos da linguagem
- Inferir o framework de testes correto
- Criar estrutura de testes caso não exista
- Mockar dependências externas
- NÃO explicar nada
- Retornar APENAS código de teste

REGRAS:
- Código pronto para rodar
- Usar boas práticas
- Testes claros, organizados e isolados
- Se necessário, criar setup/teardown
`

    try {
        const body = (await req.json()) as AIPayload

        if (!body?.mode || !Array.isArray(body.files)) {
            return NextResponse.json(
                { error: "Payload inválido." },
                { status: 400 }
            )
        }

        if (body.mode !== "tests") {
            return NextResponse.json(
                { error: "Modo não suportado." },
                { status: 400 }
            )
        }

        const userPrompt = buildTestsPrompt(body)

        const messages = [
            {
                role: "system",
                content: SYSTEM_PROMPT_TESTS,
            },
            {
                role: "user",
                content: userPrompt,
            },
        ]

        const resp = await fetch(`${process.env.API_AI_URL}/v1/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.API_AI_KEY}`,
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages,
                temperature: 0,
                max_tokens: 8000,
            }),
        })

        if (!resp.ok) {
            return NextResponse.json(
                { error: "Erro ao chamar IA." },
                { status: 500 }
            )
        }

        const json = await resp.json()
        const content = json?.choices?.[0]?.message?.content

        return NextResponse.json(
            {
                mode: "tests",
                result: content,
            },
            { status: 200 }
        )
    } catch (e) {
        console.error("Erro /api/cli/ai:", e)
        return NextResponse.json(
            { error: "Erro interno." },
            { status: 500 }
        )
    }
}

function buildTestsPrompt(payload: AIPayload): string {
    const filesContext = payload.files
        .map(
            f => `Arquivo: ${f.path}\n\`\`\`${payload.language}\n${f.code}\n\`\`\``
        )
        .join("\n\n")

    return `
Linguagem: ${payload.language}
Arquivo principal: ${payload.entry}

Contexto do projeto:
${filesContext}

Tarefa:
Gerar testes automatizados completos, prontos para execução.
`
}
