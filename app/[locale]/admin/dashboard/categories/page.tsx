"use client"

import { useState, useEffect } from "react"
import { collection, addDoc, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

interface Category {
  id: string;
  name: string;
}

export default function CategoriesPage() {
  const [name, setName] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  // Fonction pour charger les catégories
  const loadCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"))
      const categoriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[]
      setCategories(categoriesData)
    } catch (error) {
      console.error("Erreur lors du chargement des catégories:", error)
      toast.error("Erreur lors du chargement des catégories")
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  // Fonction pour créer une catégorie
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    try {
      const slug = name.toLowerCase()
        .replace(/[éèêë]/g, 'e')
        .replace(/[àâä]/g, 'a')
        .replace(/[ùûü]/g, 'u')
        .replace(/[îï]/g, 'i')
        .replace(/[ôö]/g, 'o')
        .replace(/[ç]/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

      // Utiliser le slug comme ID du document
      const docRef = doc(db, "categories", slug)
      await setDoc(docRef, {
        name,
      })

      setName("")
      toast.success("Catégorie créée avec succès")
      loadCategories()
    } catch (error) {
      console.error("Erreur lors de la création de la catégorie:", error)
      toast.error("Erreur lors de la création de la catégorie")
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour supprimer une catégorie
  const handleDelete = async (categoryId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) return

    try {
      await deleteDoc(doc(db, "categories", categoryId))
      toast.success("Catégorie supprimée avec succès")
      loadCategories()
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie:", error)
      toast.error("Erreur lors de la suppression de la catégorie")
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Gestion des catégories</h1>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nom de la catégorie
            </label>
            <div className="mt-1 flex gap-4">
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Entrez le nom de la catégorie"
                className="flex-1"
              />
              <Button type="submit" disabled={loading || !name.trim()}>
                {loading ? "Création..." : "Créer"}
              </Button>
            </div>
          </div>
        </form>
      </Card>

      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">Catégories existantes</h2>
        {categories.map((category) => (
          <Card key={category.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{category.name}</p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(category.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
        {categories.length === 0 && (
          <p className="text-gray-500">Aucune catégorie n'a été créée</p>
        )}
      </div>
    </div>
  )
} 