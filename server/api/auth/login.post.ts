export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  if (body.username === 'test@admin.com' && body.password === 'test@123') {
    // Set HttpOnly cookie
    setCookie(event, 'auth_token', 'mock_valid_token_123', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    })
    
    return {
      success: true,
      user: { username: 'test@admin.com', role: 'administrator' }
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid credentials'
  })
})
