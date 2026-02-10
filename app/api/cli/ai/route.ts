import { NextRequest, NextResponse } from 'next/server'

function resolveTestPath(sourcePath: string, language: string) {
    if (language === 'rust') {
        const name = sourcePath.split('/').pop()?.replace('.rs', '') ?? 'mod'
        return `tests/${name}_test.rs`
    }

    return `tests/generated.test`
}

function generateTestStub(language: string) {
    if (language === 'rust') {
        return `
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
`.trim()
    }

    return `
describe('generated test', () => {
    it('works', () => {
        expect(true).toBe(true)
    })
})
`.trim()
}

async function handleGenerateTests({
    language,
    files,
}: {
    language: string
    files: Array<{ path: string; code: string }>
}) {
    const generated = files.map(file => ({
        path: resolveTestPath(file.path, language),
        content: generateTestStub(language),
    }))

    return NextResponse.json({
        files: generated,
    })
}


export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.json()

        // 🔥 NORMALIZA O BODY (root ou data)
        const body = rawBody?.data ?? rawBody

        const intent = body?.intent
        const language = body?.language
        const files = body?.files

        if (!intent) {
            return NextResponse.json(
                {
                    error: 'Missing intent',
                    debug: rawBody, // ← ajuda se quebrar de novo
                },
                { status: 400 }
            )
        }

        if (!Array.isArray(files) || files.length === 0) {
            return NextResponse.json(
                { error: 'files[] is required' },
                { status: 400 }
            )
        }

        if (intent !== 'generate-tests') {
            return NextResponse.json(
                { error: `Unknown intent: ${intent}` },
                { status: 400 }
            )
        }

        return handleGenerateTests({ language, files })
    } catch (err) {
        console.error('[CLI AI ERROR]', err)

        return NextResponse.json(
            { error: 'Invalid JSON body' },
            { status: 400 }
        )
    }
}
