// 全角の数字とハイフンを半角にする（日本語入力のまま打った数字を受け付けるため）
export const toHalfWidth = (text: string): string =>
  text
    .replace(/[０-９]/g, (char) =>
      String.fromCharCode(char.charCodeAt(0) - 0xfee0),
    )
    .replace(/[－ー‐]/g, '-')

// 数値として読める文字列か（Number() だけだと '0x10' や '1e3' も通るため、形で判定する）
export const isNumberText = (text: string): boolean =>
  /^-?\d+(\.\d+)?$/.test(text)

export const isValidEmail = (text: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)

// http(s) で始まり、URL として解釈できるもの
export const isValidUrl = (text: string): boolean =>
  /^https?:\/\//.test(text) && URL.canParse(text)

// 123-4567 の形式
export const isValidPostCode = (text: string): boolean =>
  /^\d{3}-\d{4}$/.test(text)

// ハイフンを除いて、0 から始まる10〜11桁
export const isValidPhone = (digits: string): boolean =>
  /^0\d{9,10}$/.test(digits)
