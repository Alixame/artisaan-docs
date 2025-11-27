#!/usr/bin/env bash
set -e

echo "🔍 Detectando seu sistema..."

OS=$(uname -s)
ARCH=$(uname -m)

if [[ "$OS" == "Linux" && "$ARCH" == "x86_64" ]]; then
    FILE="artisaan-linux"
elif [[ "$OS" == "Darwin" && "$ARCH" == "arm64" ]]; then
    FILE="artisaan-macos-arm"
else
    echo "❌ Sistema não suportado:"
    echo "   OS=$OS  ARCH=$ARCH"
    exit 1
fi

INSTALL_DIR="$HOME/.artisaan/bin"
mkdir -p "$INSTALL_DIR"

echo "⬇️ Baixando Artisaan CLI ($FILE)..."
curl -fsSL "https://artisaan.com.br/bin/$FILE" -o "$INSTALL_DIR/artisaan"
chmod +x "$INSTALL_DIR/artisaan"

echo "✨ Instalado em: $INSTALL_DIR/artisaan"

# ----------------------------
# ADD TO PATH
# ----------------------------

add_to_shell_rc() {
    local rc_file=$1

    if [[ -f "$rc_file" ]]; then
        if ! grep -q 'export PATH="$HOME/.artisaan/bin:$PATH"' "$rc_file"; then
            echo 'export PATH="$HOME/.artisaan/bin:$PATH"' >> "$rc_file"
            echo "📌 PATH adicionado em: $rc_file"
        fi
    fi
}

SHELL_NAME=$(basename "$SHELL")

if [[ "$SHELL_NAME" == "zsh" ]]; then
    add_to_shell_rc "$HOME/.zshrc"
elif [[ "$SHELL_NAME" == "bash" ]]; then
    add_to_shell_rc "$HOME/.bashrc"
elif [[ "$SHELL_NAME" == "fish" ]]; then
    echo 'set -U fish_user_paths $HOME/.artisaan/bin $fish_user_paths' >> "$HOME/.config/fish/config.fish"
    echo "📌 PATH adicionado no fish"
fi

echo ""
echo "🚀 Tudo pronto!"
echo "👉 Abra um novo terminal e execute: artisaan --help"
