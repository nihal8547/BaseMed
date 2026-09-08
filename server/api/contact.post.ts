import { contactMessages } from '../utils/data'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.firstName || !body.lastName || !body.email || !body.message) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  const newMessage = {
    id: randomUUID(),
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone || '',
    facility: body.facility || '',
    subject: body.subject || 'other',
    message: body.message,
    status: 'unread',
    createdAt: new Date().toISOString()
  }

  contactMessages.unshift(newMessage) // Add to beginning of array so newest is first

  return { success: true, message: 'Message sent successfully' }
})
