export default defineEventHandler(async () => {
  // Fetch all products to generate URLs
  // Use absolute URL or local utils if $fetch is not working properly for internal API without full path
  // Since we are in the server, let's use the local data directly
  const { productsData } = await import('../../server/utils/data')
  
  return productsData.map(p => {
    return {
      loc: `/products/${p.id}`,
      lastmod: new Date().toISOString()
    }
  })
})
