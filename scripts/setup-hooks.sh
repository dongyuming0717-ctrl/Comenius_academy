#!/bin/bash
# Setup git hooks for all contributors
# Run from repo root: bash scripts/setup-hooks.sh
cd "$(git rev-parse --show-toplevel)" && git config core.hooksPath .husky && echo "✅ Git hooks configured (core.hooksPath = .husky)"
