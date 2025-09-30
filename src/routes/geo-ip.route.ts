import { Hono } from 'hono'
import { getSelfIp, getHostname, getRandomIp, getGeoIp } from '../handlers/geo-ip.handler'
import { ResponseFormatter } from '../utils/response-formatter'

const geoIp = new Hono()

// ルートエンドポイント
geoIp.get('/', (c) => c.json(ResponseFormatter.formatWelcomeResponse()))

// IPエンドポイント
geoIp.get('/self', getSelfIp)
geoIp.get('/hostname/:ip', getHostname)
geoIp.get('/random', getRandomIp)
geoIp.get('/:ip', getGeoIp)

export default geoIp
