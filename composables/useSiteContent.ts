import { useState } from 'nuxt/app'
import { cmsData } from '../server/utils/data'
import { ref } from 'vue'

export const useSiteContent = () => {
  const cmsContent = useState<any>('cms-content', () => null)
  const isLoading = ref(false)

  const fetchContent = async () => {
    isLoading.value = true
    try {
      const data = cmsData
      if (data) {
        cmsContent.value = data
      }
    } catch (error) {
      console.error('Failed to fetch CMS content', error)
    } finally {
      isLoading.value = false
    }
  }

  const updateContent = async (newData: any) => {
    try {
      cmsContent.value = newData
      return newData
    } catch (error) {
      console.error('Failed to update CMS content', error)
      throw error
    }
  }

  return {
    cmsContent,
    isLoading,
    fetchContent,
    updateContent
  }
}
