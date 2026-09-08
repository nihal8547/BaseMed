import { productsData } from '../../utils/data'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Product ID is required' })
  }

  const productIndex = productsData.findIndex(p => p.id === id)

  if (method === 'GET') {
    if (productIndex === -1) {
      throw createError({ statusCode: 404, statusMessage: 'Product not found' })
    }
    return productsData[productIndex]
  }

  if (method === 'PUT') {
    if (productIndex === -1) {
      throw createError({ statusCode: 404, statusMessage: 'Product not found' })
    }
    const body = await readBody(event)
    
    // Keep the same ID
    productsData[productIndex] = { ...body, id }
    return productsData[productIndex]
  }

  if (method === 'DELETE') {
    if (productIndex === -1) {
      throw createError({ statusCode: 404, statusMessage: 'Product not found' })
    }
    const deletedProduct = productsData.splice(productIndex, 1)
    return deletedProduct[0]
  }
})
