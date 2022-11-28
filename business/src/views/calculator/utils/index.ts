export function cartesian(games: Array<Array<any>>): Array<Array<any>> {
  return games.reduce((previous, current) => {
    let result: Array<Array<any>> = []
    current.forEach(c => {
      if (previous.length) {
        previous.forEach(a => {
          result.push([c].concat(a))
        })
      } else {
        result.push([c])
      }
    })
    return result as Array<Array<any>>
  }, [] as Array<Array<any>>)
}

export default {
  cartesian
}
