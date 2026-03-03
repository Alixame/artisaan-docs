import { NextRequest, NextResponse } from "next/server"

type FileInput = {
    path: string
    typeCode: string
    code: string
}

type FileOutput = {
    path: string
    markdown: string
}

const SYSTEM_PROMPT = `
Você é um redator técnico sênior especializado em documentação MDX para engenharia.

OBJETIVO
Gerar um único documento técnico em MDX, pronto para publicação.

SAÍDA OBRIGATÓRIA
- Responda APENAS com MDX puro.
- Não retorne JSON.
- Não retorne HTML genérico (<pre>, <code>, <p>, <div>, <span>, comentários HTML).
- Não inclua explicações sobre o processo de geração.
- Não envolva a resposta com \`\`\`mdx ... \`\`\`.

COMPONENTES DISPONÍVEIS
- <DocHeader title="" description="" />
- <CodeBlock>...</CodeBlock>
- <CodeTabs><CodeTabItem label="">...</CodeTabItem></CodeTabs>
- <Steps><Step title="">...</Step></Steps>

BLOCOS DE CÓDIGO (REGRA CRÍTICA)
- Todo trecho de código deve estar dentro de <CodeBlock> ou <CodeTabs>/<CodeTabItem>.
- Em <CodeBlock>, use SEMPRE o formato abaixo:
  <CodeBlock>
  \`\`\`linguagem
  código
  \`\`\`
  </CodeBlock>
- A linguagem no fence é obrigatória (ex.: ts, tsx, js, bash, json, yaml, mdx, sql).
- Nunca use \`\`\` sem linguagem.
- Nunca use código solto fora dos componentes (exceto inline com crases).

FRONT-MATTER OBRIGATÓRIO (NO TOPO)
---
title: <título humano forte>
description: <explicação curta e objetiva>
summary: <1 frase técnica resumindo o arquivo>
keywords:
  - <3 a 8 palavras-chave>
tags:
  - <tecnologias detectadas>
type: "internal" | "public"
complexity: "low" | "medium" | "high"
lastUpdated: <AAAA-MM-DD>
section: <ex: "Getting Started" | "Core" | "API" | "CLI" | "Internals">
sidebarOrder: <inteiro iniciando em 1>
sidebarLabel: <nome curto para menu lateral>
route: <slug hierárquico amigável>
---

REGRAS DE NAVEGAÇÃO
- Não use nome de arquivo literal na route.
- Não exponha extensões (.ts, .rs, etc.).
- Prefira termos humanos e técnicos.
- Arquivo introdutório: usar seção/rota em "getting-started".
- Arquivo de baixo nível: usar seção/rota em "internals".

CORPO DO DOCUMENTO
1) Após o front-matter, iniciar com:
<DocHeader title="<mesmo título>" description="<mesma descrição>" />

2) Estruturar com os títulos abaixo (usar "Não se aplica" quando necessário):
## Visão Geral
## Responsabilidades
## Parâmetros
## Retorno
## Fluxo Interno
## Casos de Uso
## Exemplos

3) Em "Parâmetros", usar tabela Markdown quando houver entradas.
4) Em "Exemplos", incluir pelo menos 1 exemplo real com <CodeBlock> contendo \`\`\`linguagem.
5) Se houver passo a passo, usar <Steps>.

ESTILO
- PT-BR, técnico, objetivo e claro.
- Sem IDs manuais em títulos.
`

function resolveCodeLanguage(typeCode: string): string {
    const normalized = typeCode?.toLowerCase().trim()

    if (!normalized) {
        return "text"
    }

    return /^[a-z0-9.+#_-]+$/.test(normalized) ? normalized : "text"
}

function normalizeMarkdownOutput(
    markdown: string,
    fallbackLanguage: string
): string {
    const trimmed = markdown.trim()
    const withoutOuterFence = trimmed.replace(
        /^```(?:mdx|markdown)?\s*([\s\S]*?)\s*```$/i,
        "$1"
    )
    const safeFallbackLanguage = resolveCodeLanguage(fallbackLanguage)

    return withoutOuterFence.replace(
        /<CodeBlock>\s*```([^\n`]*)\n([\s\S]*?)```\s*<\/CodeBlock>/g,
        (_match: string, language: string, code: string) => {
            const safeLanguage = language.trim()
                ? resolveCodeLanguage(language)
                : safeFallbackLanguage
            const normalizedCode = code.replace(/\s+$/, "")

            return `<CodeBlock>\n\`\`\`${safeLanguage}\n${normalizedCode}\n\`\`\`\n</CodeBlock>`
        }
    )
}

async function generateMarkdownForFile(file: FileInput): Promise<FileOutput> {
    const generationDate = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Sao_Paulo",
    }).format(new Date())
    const codeLanguage = resolveCodeLanguage(file.typeCode)

    const messages = [
        {
            role: "system",
            content: SYSTEM_PROMPT,
        },
        {
            role: "user",
            content: `Data atual para front-matter (lastUpdated): ${generationDate}
Caminho do arquivo: ${file.path}
Tipo do código informado: ${file.typeCode}
Linguagem sugerida para fences: ${codeLanguage}

Requisito crítico: em toda seção de exemplo, use <CodeBlock> contendo obrigatoriamente \`\`\`linguagem.

Código-fonte:
\`\`\`${codeLanguage}
${file.code}
\`\`\``,
        },
    ]

    const body = JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature: 0, // determinístico
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
        console.error(
            "Erro na chamada DeepSeek:",
            resp.status,
            resp.statusText
        )
        return {
            path: file.path,
            markdown: `# Erro ao gerar documentação\n\nStatus: ${resp.status} ${resp.statusText}`,
        }
    }

    const json = await resp.json()
    const rawMarkdown = json?.choices?.[0]?.message?.content || ""
    const markdown = rawMarkdown
        ? normalizeMarkdownOutput(rawMarkdown, codeLanguage)
        : "# Erro ao gerar documentação (resposta vazia)"

    return {
        path: file.path,
        markdown,
    }
}

export async function GET(): Promise<Response> {
    return NextResponse.json(
        { message: "API de geração batch está ativa." },
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
            files.map((file) => generateMarkdownForFile(file))
        )

        return NextResponse.json({ files: results }, { status: 200 })
    } catch (e) {
        console.error("Erro em /api/cli/batch:", e)
        return NextResponse.json(
            { error: "Erro interno ao processar arquivos." },
            { status: 500 }
        )
    }
}
