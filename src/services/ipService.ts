import { isValidIp } from '../utils/ipValidator'

export class IpService {
  private static readonly API_BASE_URL = 'https://ipapi.co'

  async fetchGeoIp(ip: string) {
    const url = `${IpService.API_BASE_URL}/${ip}/json/`
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

  async fetchSelfIp() {
    const url = `${IpService.API_BASE_URL}/json/`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('自己IP情報取得失敗')
    }

    return await response.json()
  }

  async fetchHostname(ip: string) {
    const url = `${IpService.API_BASE_URL}/${ip}/json/`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('ホスト名取得失敗')
    }

    const data = await response.json()

    if (data.error) {
      throw new Error(data.reason || '無効なIPアドレス')
    }

    return data.hostname || 'ホスト名が見つかりません'
  }

  getRandomIp(): string {
    return Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.')
  }

  validateIp(ip: string): boolean {
    return isValidIp(ip)
  }
} 