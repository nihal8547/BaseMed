import { productsData } from '../../utils/data'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === 'GET') {
    return productsData
  }

  if (method === 'POST') {
    const body = await readBody(event)
    
    // Generate simple ID
    const newId = String(Date.now())
    const newProduct = {
      ...body,
      id: newId
    }
    
    productsData.push(newProduct)
    return newProduct
  }
})
