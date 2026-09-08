import { ref, computed } from 'vue'

export const useProducts = () => {
  const products = useState<any[]>('products-state', () => [])
  const isProductsFetched = useState('products-fetched', () => false)
  const isLoading = ref(false)

  const fetchProducts = async () => {
    isLoading.value = true
    try {
      const data = await $fetch<any[]>('/api/products')
      if (data) {
        products.value = data
        isProductsFetched.value = true
      }
    } catch (error) {
      console.error('Failed to fetch products', error)
    } finally {
      isLoading.value = false
    }
  }

  const addProduct = async (productData: any) => {
    try {
      const response = await $fetch('/api/products', {
        method: 'POST',
        body: productData
      })
      if (response) {
        products.value.push(response)
        return response
      }
    } catch (error) {
      console.error('Failed to add product', error)
      throw error
    }
  }

  const updateProduct = async (id: string, productData: any) => {
    try {
      const response = await $fetch(`/api/products/${id}`, {
        method: 'PUT',
        body: productData
      })
      if (response) {
        const index = products.value.findIndex(p => p.id === id)
        if (index !== -1) {
          products.value[index] = response
        }
        return response
      }
    } catch (error) {
      console.error('Failed to update product', error)
      throw error
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      await $fetch(`/api/products/${id}`, {
        method: 'DELETE'
      })
      products.value = products.value.filter(p => p.id !== id)
    } catch (error) {
      console.error('Failed to delete product', error)
      throw error
    }
  }

  const getProductById = (id: string) => {
    return products.value.find(p => p.id === id)
  }

  const getCategories = () => {
    return [...new Set(products.value.map((p: any) => p.category))]
  }

  return {
    products,
    isProductsFetched,
    isLoading,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getCategories
  }
}
