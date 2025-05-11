export class ResponseFormatter {
  static formatGeoIpResponse(data: any) {
    return {
      status: 'success',
      ip_info: {
        ip: data.ip,
        hostname: data.hostname || '不明',
        type: data.version || '不明'
      },
      location: {
        city: data.city || '不明',
        region: data.region || '不明',
        region_code: data.region_code || '不明',
        country: data.country_name || '不明',
        country_code: data.country_code || '不明',
        continent_code: data.continent_code || '不明',
        postal: data.postal || '不明'
      },
      coordinates: {
        latitude: data.latitude,
        longitude: data.longitude
      },
      timezone: {
        timezone: data.timezone || '不明',
        utc_offset: data.utc_offset || '不明'
      },
      network: {
        asn: data.asn || '不明',
        org: data.org || '不明',
        isp: data.isp || '不明'
      },
      currency: {
        currency_name: data.currency_name || '不明',
        currency_code: data.currency || '不明'
      },
      languages: data.languages || '不明'
    }
  }

  static formatHostnameResponse(ip: string, hostname: string) {
    return {
      status: 'success',
      ip_info: {
        ip: ip,
        hostname: hostname,
        lookup_time: new Date().toISOString()
      }
    }
  }

  static formatErrorResponse(message: string) {
    return {
      status: 'error',
      message: message,
      timestamp: new Date().toISOString()
    }
  }

  static formatWelcomeResponse() {
    return {
      message: 'Geo-IP APIへようこそ！',
      endpoints: {
        '/:ip': 'IPアドレスの地理情報を取得',
        '/self': '自分のIPアドレス情報を取得',
        '/hostname/:ip': '指定IPアドレスのホスト名を取得',
        '/random': 'ランダムなIPアドレスの地理情報を取得'
      },
      status: 'success'
    }
  }
} 