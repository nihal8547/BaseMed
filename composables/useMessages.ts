import { ref } from 'vue'

export const useMessages = () => {
  const messages = useState<any[]>('messages-state', () => [])
  const isLoading = ref(false)

  const fetchMessages = async () => {
    isLoading.value = true
    try {
      const data = await $fetch<any[]>('/api/admin/messages')
      if (data) {
        messages.value = data
      }
    } catch (error) {
      console.error('Failed to fetch messages', error)
    } finally {
      isLoading.value = false
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await $fetch(`/api/admin/messages/${id}`, {
        method: 'PUT',
        body: { status: 'read' }
      })
      if (response) {
        const index = messages.value.findIndex(m => m.id === id)
        if (index !== -1) {
          messages.value[index] = response
        }
      }
    } catch (error) {
      console.error('Failed to mark message as read', error)
      throw error
    }
  }

  const deleteMessage = async (id: string) => {
    try {
      await $fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE'
      })
      messages.value = messages.value.filter(m => m.id !== id)
    } catch (error) {
      console.error('Failed to delete message', error)
      throw error
    }
  }

  return {
    messages,
    isLoading,
    fetchMessages,
    markAsRead,
    deleteMessage
  }
}
