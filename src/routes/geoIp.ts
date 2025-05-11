import { Hono } from 'hono'
import { isValidIp } from '../utils/ipValidator'

const geoIp = new Hono()

// IP情報を取得する関数
async function fetchGeoIp(ip: string) {
  const url = `https://ipapi.co/${ip}/json/`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Geo-IP API呼び出し失敗')
  }

  const data = await response.json()

  if (data.error) {
    throw new Error(data.reason || '無効なIPアドレス')
  }

  return data
}

// ルートエンドポイント
geoIp.get('/', (c) => {
  return c.json({ message: 'Geo-IP APIへようこそ！IPを指定してください。' })
})

// Geo-IPエンドポイント
geoIp.get('/:ip', async (c) => {
  const ip = c.req.param('ip')

  // IPアドレスバリデーション（4桁のみ許可）
  if (!isValidIp(ip)) {
    return c.json({ status: 'error', message: '無効な4桁IPアドレス形式' }, 400)
  }

  try {
    const geoData = await fetchGeoIp(ip)
    return c.json({
      ip: geoData.ip,
      city: geoData.city,
      region: geoData.region,
      country_name: geoData.country_name,
      latitude: geoData.latitude,
      longitude: geoData.longitude,
      status: 'success'
    })
  } catch (error: any) {
    return c.json({ status: 'error', message: error.message }, 400)
  }
})

export default geoIp
