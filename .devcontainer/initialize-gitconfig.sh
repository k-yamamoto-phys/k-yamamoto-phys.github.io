#!/bin/sh

set -eu

error() {
	printf '\n[devcontainer] ERROR: %s\n' "$1" >&2
}

if ! command -v git >/dev/null 2>&1; then
	error "ホストに Git がインストールされていません。"
	printf '%s\n' \
		"Git をインストールしてから、devcontainer を再度起動してください。" \
		"https://git-scm.com/downloads" >&2
	exit 1
fi

if [ -z "${HOME:-}" ]; then
	error "ホストの HOME 環境変数が設定されていません。"
	printf '%s\n' "HOME を設定してから、devcontainer を再度起動してください。" >&2
	exit 1
fi

gitconfig="$HOME/.gitconfig"

if [ -d "$gitconfig" ]; then
	error "$gitconfig がファイルではなくディレクトリになっています。"
	printf '%s\n' \
		"過去の bind mount 失敗で作成された可能性があります。" \
		"このディレクトリを削除してから、次を実行してください:" \
		"  sh .devcontainer/initialize-gitconfig.sh" >&2
	exit 1
fi

name=$(git config --global --get user.name 2>/dev/null || true)
email=$(git config --global --get user.email 2>/dev/null || true)

# CI や GUI からの起動時も、明示した値で非対話設定できるようにする。
name=${DEVCONTAINER_GIT_USER_NAME:-$name}
email=${DEVCONTAINER_GIT_USER_EMAIL:-$email}

if { [ -z "$name" ] || [ -z "$email" ]; } && [ -t 0 ]; then
	printf '%s\n' "devcontainer で使用する Git のユーザー情報を設定します。"

	if [ -z "$name" ]; then
		printf 'user.name: '
		IFS= read -r name
	fi

	if [ -z "$email" ]; then
		printf 'user.email: '
		IFS= read -r email
	fi
fi

if [ -z "$name" ] || [ -z "$email" ]; then
	error "ホストの Git ユーザー情報が設定されていません。"
	printf '%s\n' \
		"ホストのターミナルで次を実行し、その場で設定してください:" \
		"  sh .devcontainer/initialize-gitconfig.sh" \
		"" \
		"または、値を指定して非対話で設定できます:" \
		"  DEVCONTAINER_GIT_USER_NAME='Your Name' DEVCONTAINER_GIT_USER_EMAIL='you@example.com' sh .devcontainer/initialize-gitconfig.sh" \
		"" \
		"設定後、devcontainer を再度起動してください。" >&2
	exit 1
fi

# mount 元と同じファイルへ明示的に書き込む。XDG の Git 設定しかない場合も
# $HOME/.gitconfig が作成されるため、後続の bind mount が失敗しない。
git config --file "$gitconfig" user.name "$name"
git config --file "$gitconfig" user.email "$email"

printf '%s\n' "[devcontainer] Git 設定を確認しました: $name <$email>"
