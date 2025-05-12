import axios from 'axios'
import { isValidIp } from '../utils/ipValidator'

export class GeoIpService {
  private static readonly API_BASE_URL = 'https://ipapi.co'
  private static readonly DEFAULT_ERROR_MESSAGE = '無効なIPアドレス'

  private async makeApiRequest(url: string, errorContext: string) {
    try {
      const response = await axios.get(url)
      const data = response.data

      if (data.error) {
        throw new Error(data.reason || GeoIpService.DEFAULT_ERROR_MESSAGE)
      }

      return data
    } catch (error: any) {
      throw new Error(`${errorContext}: ${error.message}`)
    }
  }

  // IP情報を取得
  async fetchGeoIp(ip: string) {
    const url = `${GeoIpService.API_BASE_URL}/${ip}/json/`
    return this.makeApiRequest(url, 'Geo-IP API呼び出し失敗')
  }

  // 自分のIP情報を取得 
  async fetchSelfIp() {
    const url = `${GeoIpService.API_BASE_URL}/json/`
    return this.makeApiRequest(url, '自己IP情報取得失敗')
  }

  // ホスト名を取得
  async fetchHostname(ip: string) {
    const url = `${GeoIpService.API_BASE_URL}/${ip}/json/`
    const data = await this.makeApiRequest(url, 'ホスト名取得失敗')
    return data.hostname || 'ホスト名が見つかりません'
  }

  // ランダムIP生成
  getRandomIp(): string {
    const generateOctet = () => Math.floor(Math.random() * 256)
    return Array(4).fill(0).map(generateOctet).join('.')
  }

  // IPアドレスバリデーション
  validateIp(ip: string): boolean {
    return isValidIp(ip)
  }
}
