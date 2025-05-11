import { Hono } from 'hono'
import { IpService } from '../services/ipService'
import { ResponseFormatter } from '../utils/responseFormatter'

const geoIp = new Hono()
const ipService = new IpService()

// ルートエンドポイント
geoIp.get('/', (c) => {
  return c.json(ResponseFormatter.formatWelcomeResponse())
})

// 自分のIPを取得
geoIp.get('/self', async (c) => {
  try {
    const selfData = await ipService.fetchSelfIp()
    return c.json(ResponseFormatter.formatGeoIpResponse(selfData))
  } catch (error: any) {
    return c.json(ResponseFormatter.formatErrorResponse(error.message), 400)
  }
})

// ホスト名を取得
geoIp.get('/hostname/:ip', async (c) => {
  const ip = c.req.param('ip')

  if (!ipService.validateIp(ip)) {
    return c.json(ResponseFormatter.formatErrorResponse('無効な4桁IPアドレス形式'), 400)
  }

  try {
    const hostname = await ipService.fetchHostname(ip)
    return c.json(ResponseFormatter.formatHostnameResponse(ip, hostname))
  } catch (error: any) {
    return c.json(ResponseFormatter.formatErrorResponse(error.message), 400)
  }
})

// ランダムIP情報を取得
geoIp.get('/random', async (c) => {
  const ip = ipService.getRandomIp()
  try {
    const geoData = await ipService.fetchGeoIp(ip)
    const response = ResponseFormatter.formatGeoIpResponse(geoData)
    return c.json({
      ...response,
      generated_ip: ip,
      generated_at: new Date().toISOString()
    })
  } catch (error: any) {
    return c.json(ResponseFormatter.formatErrorResponse(error.message), 400)
  }
})

// Geo-IPエンドポイント
geoIp.get('/:ip', async (c) => {
  const ip = c.req.param('ip')

  if (!ipService.validateIp(ip)) {
    return c.json(ResponseFormatter.formatErrorResponse('無効な4桁IPアドレス形式'), 400)
  }

  try {
    const geoData = await ipService.fetchGeoIp(ip)
    return c.json(ResponseFormatter.formatGeoIpResponse(geoData))
  } catch (error: any) {
    return c.json(ResponseFormatter.formatErrorResponse(error.message), 400)
  }
})

export default geoIp
