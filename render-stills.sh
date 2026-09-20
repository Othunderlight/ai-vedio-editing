#!/bin/bash
# Render key frames from "Why I Love Django" for quick feedback
# Usage: bash render-stills.sh

COMPOSITION="WhyILoveDjango-Portrait"
OUT_DIR="out/stills/why-i-love-django"

mkdir -p "$OUT_DIR"

echo "Rendering key frames..."

# Frame 1 - Opening
npx remotion still "$COMPOSITION" --frame=1 "$OUT_DIR/01-opening.png" 2>&1 | tail -1

# Frame 150 - Medical Icons B-roll peak
npx remotion still "$COMPOSITION" --frame=150 "$OUT_DIR/02-medical-icons.png" 2>&1 | tail -1

# Frame 630 - Git Branch B-roll peak
npx remotion still "$COMPOSITION" --frame=630 "$OUT_DIR/03-git-branch.png" 2>&1 | tail -1

# Frame 1050 - Django Simple History docs
npx remotion still "$COMPOSITION" --frame=1050 "$OUT_DIR/04-django-history-docs.png" 2>&1 | tail -1

# Frame 1350 - Admin screen recording
npx remotion still "$COMPOSITION" --frame=1350 "$OUT_DIR/05-admin-screen.png" 2>&1 | tail -1

# Frame 1800 - Code sample 1 (settings)
npx remotion still "$COMPOSITION" --frame=1800 "$OUT_DIR/06-code-settings.png" 2>&1 | tail -1

# Frame 1980 - Code sample 2 (model)
npx remotion still "$COMPOSITION" --frame=1980 "$OUT_DIR/07-code-model.png" 2>&1 | tail -1

# Frame 2070 - End frame
npx remotion still "$COMPOSITION" --frame=2070 "$OUT_DIR/08-end.png" 2>&1 | tail -1

echo ""
echo "Done! Images saved to $OUT_DIR/"
ls -la "$OUT_DIR/"
