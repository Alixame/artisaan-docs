$BinPath = "$env:USERPROFILE\.artisaan\bin"
New-Item -ItemType Directory -Force -Path $BinPath | Out-Null

$ExePath = "$BinPath\artisaan.exe"

Write-Output "🔍 Baixando Artisaan CLI para Windows..."

Invoke-WebRequest `
  "https://artisaan.com.br/bin/artisaan-windows.exe" `
  -OutFile $ExePath

$CurrentPath = [Environment]::GetEnvironmentVariable("Path", "User")
if (-not ($CurrentPath -match [regex]::Escape($BinPath))) {
    Write-Output "⚙️ Adicionando Artisaan ao PATH..."
    [Environment]::SetEnvironmentVariable("Path", "$CurrentPath;$BinPath", "User")
}

Write-Output "✨ Artisaan instalado!"
Write-Output "➡️ Abra um novo terminal e execute: artisaan --help"
