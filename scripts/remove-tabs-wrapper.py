#!/usr/bin/env python3
"""
Script to remove the tabs wrapper from Landing.ts
This fixes the "right-hand side of 'in' should be an object, got undefined" error
"""

import re

# Read the file
with open('src/globals/Landing.ts', 'r') as f:
    content = f.read()

# Remove the tabs wrapper structure
# Pattern 1: Remove the opening tabs structure
content = re.sub(
    r"fields: \[\n\t\t\{\n\t\t\ttype: 'tabs',\n\t\t\ttabs: \[\n\t\t\t\t\{\n\t\t\t\t\tlabel: 'Contenu',\n\t\t\t\t\tfields: \[",
    "fields: [",
    content,
    flags=re.MULTILINE
)

# Pattern 2: Remove the closing tabs structure (the tricky part)
# We need to remove the extra closing brackets before the final ],
content = re.sub(
    r"\t\t\t\t\t\},\n\t\t\t\t\],\n\t\t\t\},\n\t\t\],\n\t\},\n\t\],\n\}$",
    "\t},\n\t],\n}",
    content,
    flags=re.MULTILINE
)

# Write back
with open('src/globals/Landing.ts', 'w') as f:
    f.write(content)

print("✅ Successfully removed tabs wrapper from Landing.ts")
print("🔄 Regenerate Payload types with: npm run payload generate:types")
