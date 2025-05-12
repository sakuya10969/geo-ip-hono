export function isValidIp(ip: string): boolean {
    const ipv4FourDigitsRegex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = ip.match(ipv4FourDigitsRegex);
  
    if (!match) return false;
  
    // 各桁が0～255の範囲内かチェック
    return match.slice(1).every((num) => {
      const n = parseInt(num, 10);
      return n >= 0 && n <= 255;
    });
  }
  