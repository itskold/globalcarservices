import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const MESSAGES_DIR = path.join(process.cwd(), 'messages')
const SUPPORTED_LANGUAGES = ['fr', 'en', 'nl']

interface TranslationValue {
  lang: string
  value: string
}

async function getTranslationFromFile(filePath: string, key: string): Promise<string | undefined> {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    const translations = JSON.parse(content)
    
    // Split the key by dots and traverse the object
    const keys = key.split('.')
    let value = translations
    for (const k of keys) {
      if (value === undefined) break
      value = value[k]
    }
    
    return typeof value === 'string' ? value : undefined
  } catch (error) {
    console.error(`Error reading translation from ${filePath}:`, error)
    return undefined
  }
}

async function updateTranslationInFile(filePath: string, key: string, value: string): Promise<void> {
  const content = await fs.readFile(filePath, 'utf-8')
  const translations = JSON.parse(content)
  
  // Split the key by dots and traverse/create the object structure
  const keys = key.split('.')
  let current = translations
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i]
    if (!(k in current)) {
      current[k] = {}
    }
    current = current[k]
  }
  
  // Set the value at the final key
  current[keys[keys.length - 1]] = value
  
  // Write back to file
  await fs.writeFile(filePath, JSON.stringify(translations, null, 2), 'utf-8')
}

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key')
  
  if (!key) {
    return NextResponse.json({ error: 'Missing key parameter' }, { status: 400 })
  }

  try {
    const translations: TranslationValue[] = []
    
    // Get translations for each supported language
    for (const lang of SUPPORTED_LANGUAGES) {
      const filePath = path.join(MESSAGES_DIR, `${lang}.json`)
      const value = await getTranslationFromFile(filePath, key)
      if (value !== undefined) {
        translations.push({ lang, value })
      }
    }
    
    return NextResponse.json(translations)
  } catch (error) {
    console.error('Error fetching translations:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { key, translations } = await request.json()
    
    if (!key || !Array.isArray(translations)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
    
    // Update each language file
    for (const { lang, value } of translations) {
      if (!SUPPORTED_LANGUAGES.includes(lang)) continue
      
      const filePath = path.join(MESSAGES_DIR, `${lang}.json`)
      await updateTranslationInFile(filePath, key, value)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating translations:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 