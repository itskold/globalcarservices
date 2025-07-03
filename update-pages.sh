#!/bin/bash

# Find all page.tsx files in the [locale] directory
find app/[locale] -name "page.tsx" -type f | while read -r file; do
  # Check if the file doesn't already have unstable_setRequestLocale
  if ! grep -q "unstable_setRequestLocale" "$file"; then
    # Add the import if it doesn't exist
    if ! grep -q "import.*next-intl/server" "$file"; then
      sed -i '' '1i\
import { unstable_setRequestLocale } from '\''next-intl/server'\''\
' "$file"
    fi
    
    # Update the component definition and add the locale parameter
    sed -i '' 's/export default function \([^({]*\)(/export default function \1({ params: { locale } }: { params: { locale: string } }) {\'$'\n  unstable_setRequestLocale(locale)/g' "$file"
  fi
done 