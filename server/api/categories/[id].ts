import { categoriesData, productsData } from '../../utils/data'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Category ID is required' })
  }

  const categoryIndex = categoriesData.findIndex(c => c.id === id)

  if (method === 'GET') {
    if (categoryIndex === -1) {
      throw createError({ statusCode: 404, statusMessage: 'Category not found' })
    }
    return categoriesData[categoryIndex]
  }

  if (method === 'PUT') {
    if (categoryIndex === -1) {
      throw createError({ statusCode: 404, statusMessage: 'Category not found' })
    }
    const body = await readBody(event)
    const category = categoriesData[categoryIndex]
    if (!category) {
      throw createError({ statusCode: 404, statusMessage: 'Category not found' })
    }
    
    categoriesData[categoryIndex] = { 
      ...category,
      ...body, 
      id,
      slug: body.name ? body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : category.slug
    }
    return categoriesData[categoryIndex]
  }

  if (method === 'DELETE') {
    if (categoryIndex === -1) {
      throw createError({ statusCode: 404, statusMessage: 'Category not found' })
    }

    const category = categoriesData[categoryIndex]
    if (!category) {
      throw createError({ statusCode: 404, statusMessage: 'Category not found' })
    }
    const categoryName = category.name
    
    // Option A from plan: Prevent deletion if products use this category
    const productsUsingCategory = productsData.filter(p => p.category === categoryName)
    if (productsUsingCategory.length > 0) {
      throw createError({ 
        statusCode: 400, 
        statusMessage: `Cannot delete category because ${productsUsingCategory.length} products are assigned to it.` 
      })
    }

    const deletedCategory = categoriesData.splice(categoryIndex, 1)
    return deletedCategory[0]
  }
})
