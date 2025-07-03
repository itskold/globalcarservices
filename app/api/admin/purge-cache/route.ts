import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const vercelToken = process.env.VERCEL_TOKEN
    const vercelProjectId = process.env.VERCEL_PROJECT_ID
    
    if (!vercelToken || !vercelProjectId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Vercel token ou project ID manquant' 
      }, { status: 400 })
    }
    
    console.log('[Cache] Purge manuelle du cache Vercel...')
    
    const response = await fetch(`https://api.vercel.com/v1/projects/${vercelProjectId}/cache`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${vercelToken}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      console.log('[Cache] Cache Vercel purgé avec succès')
      return NextResponse.json({ 
        success: true, 
        message: 'Cache purgé avec succès',
        timestamp: new Date().toISOString()
      })
    } else {
      const errorText = await response.text()
      console.error('[Cache] Erreur lors de la purge:', response.status, errorText)
      return NextResponse.json({ 
        success: false, 
        error: `Erreur Vercel: ${response.status} - ${errorText}` 
      }, { status: response.status })
    }
  } catch (error) {
    console.error('[Cache] Erreur lors de la purge du cache:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erreur inconnue' 
    }, { status: 500 })
  }
} 