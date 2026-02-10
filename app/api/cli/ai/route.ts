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
    if (language === 'rust') {
        const name =
            sourcePath
                .split('/')
                .pop()
                ?.replace('.rs', '') ?? 'mod'

        return `tests/${name}_test.rs`
    }

    return `tests/generated.test`
}

function generateRustTest(sourcePath: string) {
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module =
        sourcePath
            .split('/')
            .pop()
            ?.replace('.rs', '') ?? 'module'

    return `
#[cfg(test)]
mod ${module}_tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
`.trim()
}

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.json()

        // aceita root ou body embrulhado
        const body: AIPayload = rawBody?.data ?? rawBody

        if (body?.mode !== 'tests') {
            return NextResponse.json(
                {
                    error: 'Invalid mode',
                    expected: 'tests',
                    received: body?.mode,
                },
                { status: 400 }
            )
        }

        if (!Array.isArray(body.files) || body.files.length === 0) {
            return NextResponse.json(
                { error: 'files[] is required' },
                { status: 400 }
            )
        }

        const files = body.files.map(file => ({
            path: resolveTestPath(file.path, body.language),
            content: generateRustTest(file.path),
        }))

        return NextResponse.json({ files })
    } catch (err) {
        console.error('[AI ROUTE ERROR]', err)

        return NextResponse.json(
            { error: 'Invalid JSON body' },
            { status: 400 }
        )
    }
}
