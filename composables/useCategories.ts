import { ref } from 'vue'
import { categoriesData } from '../server/utils/data'

export const useCategories = () => {
  const categories = useState<any[]>('categories-state', () => [])
  const isCategoriesFetched = useState('categories-fetched', () => false)
  const isLoading = ref(false)

  const fetchCategories = async () => {
    isLoading.value = true
    try {
      // Direct mock data instead of API call
      const data = categoriesData
      if (data) {
        categories.value = data
        isCategoriesFetched.value = true
      }
    } catch (error) {
      console.error('Failed to fetch categories', error)
    } finally {
      isLoading.value = false
    }
  }

  const addCategory = async (categoryData: { name: string }) => {
    try {
      const newCategory = {
        id: Math.random().toString(36).substr(2, 9),
        name: categoryData.name,
        slug: categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }
      categories.value.push(newCategory)
      return newCategory
    } catch (error) {
      console.error('Failed to add category', error)
      throw error
    }
  }

  const updateCategory = async (id: string, categoryData: { name: string }) => {
    try {
      const index = categories.value.findIndex(c => c.id === id)
      if (index !== -1) {
        categories.value[index] = { ...categories.value[index], name: categoryData.name }
        return categories.value[index]
      }
    } catch (error) {
      console.error('Failed to update category', error)
      throw error
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      categories.value = categories.value.filter(c => c.id !== id)
    } catch (error: any) {
      const msg = error.data?.statusMessage || 'Failed to delete category'
      alert(msg)
      throw error
    }
  }

  return {
    categories,
    isCategoriesFetched,
    isLoading,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory
  }
}
