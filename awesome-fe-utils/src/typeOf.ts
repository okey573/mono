// @ts-ignore
export default (o: any) => Object!.prototype!.toString!.call(o)!.match(/\[object (.*?)\]/)![1]!.toLowerCase() as string
