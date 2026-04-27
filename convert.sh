#!/bin/bash
# Markdown to PDF Converter - Bash Script
# Usage: ./convert.sh input.md [output.pdf]

# Check if input file is provided
if [ -z "$1" ]; then
    echo "================================================"
    echo "  Markdown to PDF Converter"
    echo "================================================"
    echo ""
    echo "Usage: ./convert.sh input.md [output.pdf]"
    echo ""
    echo "Examples:"
    echo "  ./convert.sh document.md"
    echo "  ./convert.sh document.md output.pdf"
    echo "  ./convert.sh ../document.md"
    echo ""
    echo "================================================"
    exit 1
fi

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run the Node.js script
node "$SCRIPT_DIR/md2pdf.js" "$@"
