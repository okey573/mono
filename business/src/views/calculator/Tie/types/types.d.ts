declare namespace Tie {

  interface Game {
    home: string,
    guest: string,
    win: number,
    draw: number,
    lose: number
  }

  interface SingleGameResult {
    result: string,
    odds: number,
    game: string
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
    bonus: number,
    profit: number
  }
}
