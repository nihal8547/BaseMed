import { categoriesData } from '../../utils/data'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === 'GET') {
    return categoriesData
  }

  if (method === 'POST') {
    const body = await readBody(event)
    
    if (!body.name) {
      throw createError({ statusCode: 400, statusMessage: 'Category name is required' })
    }

    const newCategory = {
      id: randomUUID(),
      name: body.name,
      slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    }

    categoriesData.push(newCategory)
    return newCategory
  }
})
