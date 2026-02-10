import { NextRequest, NextResponse } from 'next/server'

function resolveTestPath(sourcePath: string, language: string) {
    if (language === 'rust') {
        const name = sourcePath.split('/').pop()?.replace('.rs', '') ?? 'test'
        return `tests/${name}_test.rs`
    }

    if (language === 'typescript' || language === 'javascript') {
        return sourcePath.replace(
            /(src|lib)\//,
            'tests/'
        ).replace(/\.(ts|js)$/, '.test.$1')
    }

    return `tests/generated.test`
}

function generateFakeTest(_code: string, language: string) {
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
    /**
     * Aqui entra sua IA real (OpenAI, Azure, etc)
     * Vou mockar o formato correto da resposta
     */

    const generatedFiles = files.map(file => {
        return {
            path: resolveTestPath(file.path, language),
            content: generateFakeTest(file.code, language),
        }
    })

    return NextResponse.json({
        files: generatedFiles,
    })
}


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const { intent, language, files } = body

        if (!intent) {
            return NextResponse.json(
                { error: 'Missing intent' },
                { status: 400 }
            )
        }

        if (!Array.isArray(files) || files.length === 0) {
            return NextResponse.json(
                { error: 'files[] is required' },
                { status: 400 }
            )
        }

        switch (intent) {
            case 'generate-tests': {
                return handleGenerateTests({ language, files })
            }

            default:
                return NextResponse.json(
                    { error: `Unknown intent: ${intent}` },
                    { status: 400 }
                )
        }
    } catch (err) {
        console.error('[CLI AI ERROR]', err)

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
