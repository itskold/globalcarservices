import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const originalPath = formData.get('path') as string
    
    if (!file || !originalPath) {
      return NextResponse.json(
        { error: 'No file uploaded or no path provided' },
        { status: 400 }
      )
    }

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      )
    }

    // Vérifier la taille du fichier (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 50MB' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Extraire le chemin relatif depuis public/
    const relativePath = originalPath.startsWith('/') ? originalPath.slice(1) : originalPath
    const fullPath = join(process.cwd(), 'public', relativePath)
    
    // Sauvegarder en écrasant l'image existante
    await writeFile(fullPath, buffer)
    
    return NextResponse.json({ 
      success: true,
      url: originalPath // Retourner le même chemin
    })
    
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
} 