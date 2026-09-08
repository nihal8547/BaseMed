import { ref } from 'vue'

export const useCategories = () => {
  const categories = useState<any[]>('categories-state', () => [])
  const isCategoriesFetched = useState('categories-fetched', () => false)
  const isLoading = ref(false)

  const fetchCategories = async () => {
    isLoading.value = true
    try {
      const data = await $fetch<any[]>('/api/categories')
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
      const response = await $fetch('/api/categories', {
        method: 'POST',
        body: categoryData
      })
      if (response) {
        categories.value.push(response)
        return response
      }
    } catch (error) {
      console.error('Failed to add category', error)
      throw error
    }
  }

  const updateCategory = async (id: string, categoryData: { name: string }) => {
    try {
      const response = await $fetch(`/api/categories/${id}`, {
        method: 'PUT',
        body: categoryData
      })
      if (response) {
        const index = categories.value.findIndex(c => c.id === id)
        if (index !== -1) {
          categories.value[index] = response
        }
        return response
      }
    } catch (error) {
      console.error('Failed to update category', error)
      throw error
    }
  }

  const deleteCategory = async (id: string) => {
    try {
      await $fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      })
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
