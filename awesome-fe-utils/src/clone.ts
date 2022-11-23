type ReturnSelfTypeFunction<T> = (o: T) => T

import typeOf from './typeOf'


const cloneBoolean: ReturnSelfTypeFunction<boolean> = function (o) {
  return o
}

const cloneNull: ReturnSelfTypeFunction<null> = function (o) {
  return o
}

const cloneUndefined: ReturnSelfTypeFunction<undefined> = function (o) {
  return o
}

const cloneNumber: ReturnSelfTypeFunction<number> = function (o) {
  return o
}

const cloneBigint: ReturnSelfTypeFunction<bigint> = function (o) {
  return o
}

const cloneString: ReturnSelfTypeFunction<string> = function (o) {
  return o
}

// https://blog.csdn.net/weixin_44100002/article/details/121989577
// https://github.com/lodash/lodash/blob/master/.internal/baseClone.js

const clone = function <T>(o: T): T {
  const type = typeOf(o)
  switch (type) {
    case 'Boolean':
      return cloneBoolean(o as unknown as boolean) as unknown as T
    // TODO 其他类型未实现
    default:
      return o as unknown as T
  }
}

export default clone

