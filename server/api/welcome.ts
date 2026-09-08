import { get } from '@vercel/global-config';

export default defineEventHandler(async (event) => {
  try {
    const greeting = await get('greeting');
    return greeting;
  } catch (error) {
    console.error('Error fetching from global config:', error);
    return { error: 'Failed to fetch from global config' };
  }
})
