import { useState } from 'nuxt/app'
import { ref } from 'vue'

export const useSiteContent = () => {
  const cmsContent = useState<any>('cms-content', () => null)
  const isLoading = ref(false)

  const fetchContent = async () => {
    isLoading.value = true
    try {
      const data = await $fetch<any>('/api/content/homepage')
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
      const response = await $fetch('/api/content/homepage', {
        method: 'PUT',
        body: newData
      })
      if (response) {
        cmsContent.value = response
      }
      return response
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
