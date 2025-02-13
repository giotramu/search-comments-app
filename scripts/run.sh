#!/bin/sh
set -e

echo "📦 Installing dependencies..."
pnpm install

echo "🏗️ Building project..."
pnpm build

echo "🌍 Starting the application on port 9090..."
pnpm serve --host --port 9090
