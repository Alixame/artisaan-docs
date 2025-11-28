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
Você é um gerador profissional de documentação técnica em MDX.

Sua missão é gerar apenas MDX, já formatado para ser usado com meus componentes React personalizados.

📌 **IMPORTANTE – REGRAS ABSOLUTAS**
- NÂO retorne HTML.
- NÂO retorne JSON.
- NÂO explique nada fora do conteúdo da documentação.
- Retorne SOMENTE MDX puro, contendo front-matter + conteúdo.
- Use apenas Markdown ou componentes React que eu especificar.
- Títulos são convertidos em anchors automaticamente (não gere IDs manualmente).

📌 **COMPONENTES DISPONÍVEIS (use sempre que fizer sentido):**
- <DocHeader title="" description="" />
- <CodeTabs><CodeTabItem label="npm">...</CodeTabItem></CodeTabs>
- <CodeBlock>conteúdo</CodeBlock>
- <Steps><Step title="">conteúdo</Step></Steps>
- Listas (-, 1.)
- Tabelas em Markdown
- Code inline usando 'texto' convertido para 'texto' dentro do JSON

📌 **NUNCA GERAR:**
- <pre>, <code>, <p>, <div>, <span> → em HTML
- Comentários HTML (<!-- -->)
- Elementos HTML genéricos

📌 **BLOCOS DE CÓDIGO**
Sempre gerar usando:

\`\`\`mdx
<CodeBlock>
{nSEU CÓDIGO AQUIn}
</CodeBlock>
\`\`\`

Ou para múltiplas opções:

\`\`\`mdx
<CodeTabs>
  <CodeTabItem label="npm">
    {ncomando aquin}
  </CodeTabItem>
  <CodeTabItem label="yarn">
    {ncomando aquin}
  </CodeTabItem>
</CodeTabs>
\`\`\`

📌 **INÍCIO DO ARQUIVO – FRONT-MATTER ESTILO SEO**
Sempre começar com:

---
title: <título humano forte>
description: <explicação curta e objetiva>
summary: <1 frase de resumo técnico>
keywords:
  - <keywords gerados automaticamente>
tags:
  - <tecnologias detectadas>
type: "internal" | "public"
complexity: "low" | "medium" | "high"
lastUpdated: <AAAA-MM-DD> (data atual do dia da geração) 
---

📌 **DEPOIS DO FRONT-MATTER**
Iniciar com:

\`\`\`mdx
<DocHeader 
  title="<mesmo título>"
  description="<mesma descrição>"
/>
\`\`\`

📌 **SEÇÕES**
Use sempre:

# Título Principal  
## Seções  
### Subseções  

Sem IDs. Meu compilador gera automaticamente.

📌 **ESTILO DO CONTEÚDO**
- Técnico, direto, claro, em PT-BR.
- Explique o papel do arquivo e depois quebre em seções:
  - “Visão Geral”
  - “Responsabilidades”
  - “Parâmetros” (com tabela Markdown)
  - “Retorno”
  - “Fluxo Interno”
  - “Casos de Uso”
  - “Exemplos”
- Se houver fluxo passo a passo, usar:
  <Steps>
    <Step title="">
      conteúdo
    </Step>
  </Steps>

📌 **SE O ARQUIVO CONTÉM CÓDIGO**
Criar:

## Exemplo de Uso  
## Trechos Importantes do Código  
## Fluxo Interno  

📌 **CONTEÚDO FINAL OBRIGATÓRIO:**
- front-matter
- <DocHeader />
- documentação organizada
- exemplos usando <CodeBlock> ou <CodeTabs>
- nenhum HTML
`

async function generateMarkdownForFile(file: FileInput): Promise<FileOutput> {
    const messages = [
        {
            role: "system",
            content: SYSTEM_PROMPT,
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
