import { cmsData } from '../../utils/data'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === 'GET') {
    return cmsData
  }

  if (method === 'PUT') {
    const body = await readBody(event)
    
    // Update the properties of cmsData (shallow merge)
    if (body.hero) cmsData.hero = { ...cmsData.hero, ...body.hero }
    if (body.trust) cmsData.trust = { ...cmsData.trust, ...body.trust }
    if (body.mission) cmsData.mission = { ...cmsData.mission, ...body.mission }
    
    return cmsData
  }
})
