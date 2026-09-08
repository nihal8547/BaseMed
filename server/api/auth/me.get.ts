export default defineEventHandler((event) => {
  const token = getCookie(event, 'auth_token')
  
  if (token === 'mock_valid_token_123') {
    return {
      user: { username: 'admin', role: 'administrator' }
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Unauthorized'
  })
})
