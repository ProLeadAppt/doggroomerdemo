#!/bin/bash
# ============================================================
# 🚀 Munyal Skills Bootstrap Script
# Run this in any new repo to install all standard skills
# Usage: bash setup-skills.sh
# ============================================================

set -e

echo "============================================"
echo "  Installing Munyal Standard Skills Stack"
echo "============================================"
echo ""

# --- Marketing Skills (coreyhaines31/marketingskills) ---
echo "📣 Installing Marketing Skills..."
npx skills add https://github.com/coreyhaines31/marketingskills --skill copywriting
npx skills add https://github.com/coreyhaines31/marketingskills --skill seo-audit
npx skills add https://github.com/coreyhaines31/marketingskills --skill marketing-psychology
npx skills add https://github.com/coreyhaines31/marketingskills --skill content-strategy
npx skills add https://github.com/coreyhaines31/marketingskills --skill marketing-ideas
npx skills add https://github.com/coreyhaines31/marketingskills --skill product-marketing-context
npx skills add https://github.com/coreyhaines31/marketingskills --skill social-content
npx skills add https://github.com/coreyhaines31/marketingskills --skill programmatic-seo
npx skills add https://github.com/coreyhaines31/marketingskills --skill pricing-strategy
echo "✅ Marketing Skills installed"
echo ""

# --- Superpowers (obra/superpowers) ---
echo "⚡ Installing Superpowers..."
npx skills add https://github.com/obra/superpowers --skill brainstorming
npx skills add https://github.com/obra/superpowers --skill using-superpowers
npx skills add https://github.com/obra/superpowers --skill executing-plans
npx skills add https://github.com/obra/superpowers --skill requesting-code-review
npx skills add https://github.com/obra/superpowers --skill subagent-driven-development
echo "✅ Superpowers installed"
echo ""

# --- Anthropic Official Skills (anthropics/skills) ---
echo "🔧 Installing Anthropic Skills..."
npx skills add https://github.com/anthropics/skills --skill skill-creator
npx skills add https://github.com/anthropics/skills --skill frontend-design
npx skills add https://github.com/anthropics/skills --skill mcp-builder
echo "✅ Anthropic Skills installed"
echo ""

# --- Vercel Skills (vercel-labs) ---
echo "▲ Installing Vercel Skills..."
npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
npx skills add https://github.com/vercel-labs/skills --skill find-skills
echo "✅ Vercel Skills installed"
echo ""

# --- Impeccable Design Skills (pbakaus/impeccable) ---
echo "🎨 Installing Impeccable Design Skills..."
npx skills add https://github.com/pbakaus/impeccable --skill frontend-design
npx skills add https://github.com/pbakaus/impeccable --skill polish
npx skills add https://github.com/pbakaus/impeccable --skill critique
npx skills add https://github.com/pbakaus/impeccable --skill adapt
npx skills add https://github.com/pbakaus/impeccable --skill audit
echo "✅ Impeccable Design Skills installed"
echo ""

# --- Auth Skills (better-auth) ---
echo "🔐 Installing Auth Skills..."
npx skills add https://github.com/better-auth/skills --skill better-auth-best-practices
echo "✅ Auth Skills installed"
echo ""

# --- Git Repos to Clone (optional — uncomment if needed) ---
# echo "📦 Cloning reference repos..."
# git clone https://github.com/gsd-build/get-shit-done.git
# git clone https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git
# git clone https://github.com/thedotmack/claude-mem.git
# echo "✅ Repos cloned"

echo ""
echo "============================================"
echo "  ✅ All skills installed successfully!"
echo "  Total: 27 skills from 7 sources"
echo "============================================"
echo ""
echo "Tip: Add more skills by editing this script"
echo "     or run: npx skills add <repo> --skill <name>"
