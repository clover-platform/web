// biome-ignore lint/suspicious/noExplicitAny: bytes
export const byteConvert = (bytes: any) => {
  if (Number.isNaN(bytes)) {
    return ''
  }
  const symbols = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let exp = Math.floor(Math.log(bytes) / Math.log(2))
  if (exp < 1) {
    exp = 0
  }
  const i = Math.floor(exp / 10)
  const value = bytes / 2 ** (10 * i)

  const displayValue = value.toString().length > value.toFixed(2).toString().length ? value.toFixed(2) : value
  return `${displayValue} ${symbols[i]}`
}
