export function cartesian(games: Array<Array<any>>): Array<Array<any>> {
  return games.reduce((previous, current) => {
    let result: Array<Array<any>> = []
    current.forEach(c => {
      if (previous.length) {
        previous.forEach(a => {
          result.push(a.concat(c))
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
