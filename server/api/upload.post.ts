import { writeFile } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    
    if (!formData || formData.length === 0) {
      throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
    }

    const file = formData[0]
    
    if (!file || !file.filename || !file.data) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid file' })
    }

    // Extract extension
    const ext = path.extname(file.filename)
    // Generate unique filename
    const uniqueFilename = `${randomUUID()}${ext}`
    
    // Save to public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    
    // Ensure directory exists
    const fs = await import('fs')
    if (!fs.existsSync(uploadDir)) {
      await fs.promises.mkdir(uploadDir, { recursive: true })
    }
    
    const filePath = path.join(uploadDir, uniqueFilename)
    
    await writeFile(filePath, file.data)

    return {
      success: true,
      url: `/uploads/${uniqueFilename}`
    }
    
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: err.message || 'Error uploading file'
    })
  }
})
