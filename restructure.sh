#!/bin/bash

echo "📦 Restructuring your full-stack project..."

# Create new folders
mkdir -p frontend/app frontend/public frontend/styles frontend/hooks frontend/types
mkdir -p backend

# Move backend files
mv rag-backend/* backend/ 2>/dev/null
mv render.yaml backend/ 2>/dev/null
mv rag-backend backend/.archive 2>/dev/null # preserve the folder stub in case it's a git module

# Move frontend files
mv app/* frontend/app/ 2>/dev/null
mv public/* frontend/public/ 2>/dev/null
mv styles/* frontend/styles/ 2>/dev/null
mv hooks/* frontend/hooks/ 2>/dev/null
mv types/* frontend/types/ 2>/dev/null
mv favicon.ico globals.css layout.tsx page.tsx config.ts frontend/ 2>/dev/null
mv tailwind.config.js next.config.ts postcss.config.js tsconfig.json next-env.d.ts frontend/ 2>/dev/null
mv package.json package-lock.json frontend/ 2>/dev/null
mv .env frontend/.env 2>/dev/null

# Leave a .gitkeep if any folders are empty now
touch frontend/public/.gitkeep frontend/styles/.gitkeep frontend/hooks/.gitkeep backend/.gitkeep

# Clean up dangling folders
rmdir app public styles hooks types 2>/dev/null || true

echo "✅ Done! New structure:"
tree -L 2

echo "💡 Reminder:"
echo "- Run \`cd frontend && npm install\`"
echo "- Backend code is now in \`backend/\`"

