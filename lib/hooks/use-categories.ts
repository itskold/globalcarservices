import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Category {
  id: string
  name: string
  slug: string
  createdAt: string
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"))
        const categoriesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Category[]
        setCategories(categoriesData)
        setError(null)
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error)
        setError("Erreur lors du chargement des catégories")
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  return { categories, loading, error }
} 