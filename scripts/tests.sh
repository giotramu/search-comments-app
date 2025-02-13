#!/bin/sh
set -e

echo "📦 Installing dependencies..."
pnpm install

echo "🚨 Type-checking..."
pnpm pnpm check:tsc

echo "🚨 Linting..."
pnpm pnpm check:src

echo "🚨 Running tests..."
pnpm test:ci
