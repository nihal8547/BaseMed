import { contactMessages } from '../../../utils/data'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Message ID is required' })
  }

  const messageIndex = contactMessages.findIndex(m => m.id === id)

  if (messageIndex === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Message not found' })
  }

  if (method === 'PUT') {
    const body = await readBody(event)
    
    contactMessages[messageIndex] = {
      ...contactMessages[messageIndex],
      status: body.status || contactMessages[messageIndex].status
    }
    
    return contactMessages[messageIndex]
  }

  if (method === 'DELETE') {
    const deletedMessage = contactMessages.splice(messageIndex, 1)
    return deletedMessage[0]
  }
})
