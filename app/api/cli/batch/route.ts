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
Você é um gerador profissional de documentação técnica.
Gere uma documentação limpa, elegante e totalmente em Markdown.
Não retorne HTML.
Não retorne JSON.
Apenas Markdown puro.

Regras:
- Retorno em PT-BR.
- Comece com um título H1 forte.
- Explique claramente o papel do arquivo.
- Documente classes, funções, métodos e comportamentos importantes.
- Se houver rotas / endpoints HTTP, documente-os em uma seção de Endpoints:
  - Método HTTP
  - URL
  - O que faz
  - Parâmetros principais
- Use headings (##, ###), listas, blocos de código quando útil.
- Seja objetivo, técnico e direto.
- Não explique que está gerando documentação.
- Não use markdown fora do conteúdo (sem comentários extras).
`

const SYSTEM_PROMPT_COM_SEO = `
Você é um gerador profissional de documentação técnica e documentação SEO.
Retorne exclusivamente um arquivo completo em **MDX**, contendo:

1) Um bloco de FRONT-MATTER no início, seguindo o padrão:
---
title: <título forte, humano e direto baseado no conteúdo>
description: <explicação curta e clara do que o arquivo faz>
summary: <resumo técnico de 1 frase>
keywords:
  - <keywords essenciais geradas automaticamente>
  - <função / classe / módulo>
  - <linguagem>
tags:
  - <stack>
  - <modulo detectado>
type: "internal" ou "public" conforme o contexto identificado no código
complexity: "low" | "medium" | "high" dependendo da complexidade do arquivo
lastUpdated: <data atual no formato YYYY-MM-DD>
---

2) Depois do front-matter, gerar a documentação completa em **MDX puro**:
- Em PT-BR.
- Sem JSON, sem HTML.
- Comece com um título H1 coerente com o front-matter.
- Documente o arquivo, explicando claramente sua função no sistema.
- Liste classes, funções, métodos, estados e fluxos importantes.
- Se houver APIs HTTP, crie uma seção: “## Endpoints”.
- Se houver variáveis complexas ou constantes, explique o papel de cada uma.
- Se houver padrões arquiteturais, descreva-os.
- Utilize headings, listas, tabelas e blocos de código conforme necessário.
- Não comente sobre o processo de geração.
- Não explique que você é uma IA.
- Gere SEO automaticamente baseado no conteúdo (título, summary, keywords).

O foco é entregar uma documentação impecável, rastreável e otimizada para indexação.
`

async function generateMarkdownForFile(file: FileInput): Promise<FileOutput> {
    const messages = [
        {
            role: "system",
            content: SYSTEM_PROMPT_COM_SEO,
        },
        {
            role: "user",
            content: `Tipo do código: ${file.typeCode}\n\nCódigo-fonte:\n\`\`\`${file.typeCode}\n${file.code}\n\`\`\``,
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
    const markdown =
        json?.choices?.[0]?.message?.content ||
        "# Erro ao gerar documentação (resposta vazia)"

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
