import { NextRequest, NextResponse } from 'next/server'

type AIFile = {
    path: string
    code: string
}

type AIPayload = {
    mode: 'tests'
    language: string
    entry?: string
    files: AIFile[]
}

function resolveTestPath(sourcePath: string, language: string) {
    const parts = sourcePath.split('/')
    const file = parts.pop() ?? ''
    const dir = parts.join('/')

    const name = file.split('.').slice(0, -1).join('.')

    switch (language) {
        // =================
        // RUST
        // =================
        case 'rust':
            return `tests/${name}_test.rs`

        // =================
        // TS / JS
        // =================
        case 'typescript':
        case 'javascript': {
            const ext = file.endsWith('.tsx') ? 'tsx' :
                        file.endsWith('.ts') ? 'ts' : 'js'

            return `${dir}/__tests__/${name}.test.${ext}`
        }

        // =================
        // PHP
        // =================
        case 'php':
            return `tests/Unit/${name}Test.php`

        // =================
        // PYTHON
        // =================
        case 'python':
            return `tests/${dir.replace(/^src\//, '')}/test_${name}.py`

        // =================
        // JAVA / KOTLIN
        // =================
        case 'java':
        case 'kotlin':
            return sourcePath
                .replace('/main/', '/test/')
                .replace(`.${language === 'java' ? 'java' : 'kt'}`, `Test.${language === 'java' ? 'java' : 'kt'}`)

        // =================
        // GO
        // =================
        case 'go':
            return `${dir}/${name}_test.go`

        // =================
        // FALLBACK
        // =================
        default:
            return `tests/${name}.test`
    }
}

export async function POST(req: NextRequest) {
    try {
        const body: AIPayload = await req.json()

        if (body.mode !== 'tests') {
            return NextResponse.json(
                { error: 'Invalid mode' },
                { status: 400 }
            )
        }

        if (!body.files?.length) {
            return NextResponse.json(
                { error: 'files[] is required' },
                { status: 400 }
            )
        }

        const SYSTEM_PROMPT = `
Você é um engenheiro sênior especialista em testes automatizados.

REGRAS:
- Gere testes REAIS
- NÃO gere placeholders
- NÃO use it_works
- Use o framework idiomático da linguagem
- Referencie funções reais do código
- Retorne APENAS código de teste
        `.trim()

        const results = []

        for (const file of body.files) {
            const userPrompt = `
Arquivo: ${file.path}
Linguagem: ${body.language}

Código:
${file.code}
            `.trim()

            const aiResp = await fetch(process.env.AI_BASE_URL!, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.AI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: process.env.AI_MODEL,
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        { role: 'user', content: userPrompt },
                    ],
                    temperature: 0.2,
                }),
            })

            if (!aiResp.ok) {
                const err = await aiResp.text()
                return NextResponse.json(
                    { error: 'AI error', details: err },
                    { status: 500 }
                )
            }

            const data = await aiResp.json()
            const content =
                data.choices?.[0]?.message?.content?.trim()

            if (!content) {
                return NextResponse.json(
                    { error: 'Empty AI response' },
                    { status: 500 }
                )
            }

            results.push({
                path: resolveTestPath(file.path, body.language),
                content,
            })
        }

        return NextResponse.json({ files: results })
    } catch (err) {
        console.error('[AI TEST ROUTE ERROR]', err)
        return NextResponse.json(
            { error: 'Invalid request' },
            { status: 400 }
        )
    }
}
