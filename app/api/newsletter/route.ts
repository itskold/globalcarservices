import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validation de l'email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const q = query(
      collection(db, 'newsletter'),
      where('email', '==', email)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return NextResponse.json(
        { error: 'Cette adresse email est déjà inscrite' },
        { status: 409 }
      );
    }

    // Ajouter l'email à la collection newsletter
    await addDoc(collection(db, 'newsletter'), {
      email,
      subscribedAt: new Date().toISOString(),
      active: true,
    });

    return NextResponse.json(
      { message: 'Inscription réussie à la newsletter' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'inscription à la newsletter:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 