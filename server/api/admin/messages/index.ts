import { contactMessages } from '../../../utils/data'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === 'GET') {
    return contactMessages
  }
})
