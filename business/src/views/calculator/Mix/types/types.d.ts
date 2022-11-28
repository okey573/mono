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


  interface ResultRow {
    title: string,
    odds: number
    game: Omit<Game, 'results'>
  }

  interface Column {
    label: string,
    prop: string
  }

  interface Row {
    bonus: number,
    bonusRatio: string,
    profit: number,
    profitRatio: string,
    [key: string]: string | number
  }

  type Status = Partial<{
    gameType: string
    // 比赛场数
    gamesLength: number,
    // 全部的组合数
    entireCombinations: number,
    // 所选的组合数
    checkedCombinations: number,
    // 1倍花费
    cost: number,
    // 中奖概率
    winPrizeRatio: string,
    // 盈利组合数
    profitCombinations: number,
    // 亏损组合数
    lossCombinations: number,
    // 盈利概率
    profitRatio: string,
    // 盈亏比例
    profitRatioLoss: string
  }>
}
