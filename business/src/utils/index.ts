export function percentage(ratio: number): string {
  const ratioFixedStr = (ratio * 100).toFixed(2)
  const ratioStr = Number(ratioFixedStr)
  return `${ratioStr}%`
}

export function formatFloat(number: number): number {
  return Number(number.toFixed(2))
}

export default {
  formatFloat,
  percentage
}


