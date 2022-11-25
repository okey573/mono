declare namespace Mix {
  interface Game {
    home: string,
    guest: string,
    results: Array<Result>
  }

  interface Result {
    title: string,
    odds: number
  }


  interface GameResult {
    game1?: string,
    game2?: string,
    game3?: string,
    game4?: string,
    game5?: string,
    game6?: string,
    game7?: string,
    game8?: string,

  }
}
