import delay from './src/delay'
// @ts-ignore
import packageInfo from './package.json'

const version: string = packageInfo.version

export {
  version,
  delay
}
