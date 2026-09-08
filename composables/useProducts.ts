import { ref, computed } from 'vue'
import { productsData } from '../server/utils/data'

export const useProducts = () => {
  const products = useState<any[]>('products-state', () => [])
  const isProductsFetched = useState('products-fetched', () => false)
  const isLoading = ref(false)

  const fetchProducts = async () => {
    isLoading.value = true
    try {
      const data = productsData
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
      const newProduct = {
        ...productData,
        id: Math.random().toString(36).substr(2, 9)
      }
      products.value.push(newProduct)
      return newProduct
    } catch (error) {
      console.error('Failed to add product', error)
      throw error
    }
  }

  const updateProduct = async (id: string, productData: any) => {
    try {
      const index = products.value.findIndex(p => p.id === id)
      if (index !== -1) {
        products.value[index] = { ...products.value[index], ...productData }
        return products.value[index]
      }
    } catch (error) {
      console.error('Failed to update product', error)
      throw error
    }
  }

  const deleteProduct = async (id: string) => {
    try {
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
