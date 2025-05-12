// src/handlers/geoIpHandler.ts

import { Context } from 'hono'
import { GeoIpService } from '../services/geo-ip.service'
import { ResponseFormatter } from '../utils/responseFormatter'

const ipService = new GeoIpService()

export const getSelfIp = async (c: Context) => {
  try {
    const selfData = await ipService.fetchSelfIp()
    return c.json(ResponseFormatter.formatGeoIpResponse(selfData))
  } catch (error: any) {
    return c.json(ResponseFormatter.formatErrorResponse(error.message), 400)
  }
}

export const getHostname = async (c: Context) => {
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
}

export const getRandomIp = async (c: Context) => {
  const ip = ipService.getRandomIp()
  try {
    const geoData = await ipService.fetchGeoIp(ip)
    return c.json({
      ...ResponseFormatter.formatGeoIpResponse(geoData),
      generated_ip: ip,
      generated_at: new Date().toISOString(),
    })
  } catch (error: any) {
    return c.json(ResponseFormatter.formatErrorResponse(error.message), 400)
  }
}

export const getGeoIp = async (c: Context) => {
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
}
