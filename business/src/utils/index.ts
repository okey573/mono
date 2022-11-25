export function percentage(ratio: number): string {
  const ratioFixedStr = (ratio * 100).toFixed(2)
  const ratioStr = Number(ratioFixedStr)
  return `${ratioStr}%`
}

export default {
  percentage
}


