#!/usr/bin/env bash
set -e

OS=$(uname -s)
ARCH=$(uname -m)

echo "🔍 Detectando seu sistema..."

if [[ "$OS" == "Linux" ]] && [[ "$ARCH" == "x86_64" ]]; then
    FILE="artisaan-linux"

elif [[ "$OS" == "Darwin" ]] && [[ "$ARCH" == "arm64" ]]; then
    FILE="artisaan-macos-arm"

else
    echo "❌ Sistema não suportado:"
    echo "   OS=$OS"
    echo "   ARCH=$ARCH"
    exit 1
fi

INSTALL_DIR="/usr/local/bin"
BIN_PATH="$INSTALL_DIR/artisaan"

echo "⬇️ Baixando Artisaan CLI ($FILE)..."
curl -fsSL "https://artisaan.com.br/bin/$FILE" -o "$BIN_PATH"

chmod +x "$BIN_PATH"

echo "✨ Artisaan instalado com sucesso!"
echo "➡️ Execute: artisaan --help"
