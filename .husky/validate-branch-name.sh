#!/usr/bin/env sh
set -e

branch_name=$(git branch --show-current)

case "$branch_name" in
  "" | main | master | staging | dependabot/*)
    exit 0
    ;;
esac

pattern="^(feat|fix|hotfix|style|refactor|chore|test|build|ci|infra|docs|perf|revert)/[a-z0-9]+(-[a-z0-9]+)*$"

if ! printf "%s\n" "$branch_name" | grep -Eq "$pattern"; then
  echo "❌ Invalid branch name: $branch_name"
  echo "👉 Expected format: type/scope-description"
  echo "👉 Allowed types: feat, fix, hotfix, style, refactor, chore, test, build, ci, infra, docs, perf, revert"
  echo "👉 Example: feat/seo-setup, fix/auth-contract, hotfix/session-expiry, chore/code-quality-setup"
  exit 1
fi
