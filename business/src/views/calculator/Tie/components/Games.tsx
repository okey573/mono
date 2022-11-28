import './Games.scss'

type Game = Tie.Game

const Games = defineComponent({
  name: 'Games',
  setup(props, { expose }) {
    const games = reactive<Array<Game>>([])

    const dynamicGamesTable = computed(() => {
      const gamesLength = games.length
      if (gamesLength) {
        return {
          'grid-template-rows': `60px repeat(${gamesLength}, 40px) 40px`
        }
      } else {
        return {
          'grid-template-rows': `60px 40px`
        }
      }

    })

    const addGame = () => {
      games.push({} as Game)
    }

    expose({
      games
    } as {
      games: Array<Game>
    })
    return () => <div class="games">
      <div class={['games-table',]} style={dynamicGamesTable.value}>
        <div>主场</div>
        <div>客场</div>
        <div>主场胜赔率</div>
        <div>主场平赔率</div>
        <div>主场负赔率</div>
        {
          games.map(game => {
            return <>
              <div class="edit-cell" contenteditable v-html={game.home} onBlur={(e) => {
                // @ts-ignore
                game.home = e.target.innerText
              }} />
              <div class="edit-cell" contenteditable v-html={game.guest} onBlur={(e) => {
                // @ts-ignore
                game.guest = e.target.innerText
              }} />
              <div class="edit-cell" contenteditable v-html={game.win} onBlur={(e) => {
                // @ts-ignore
                game.win = e.target.innerText
              }} />
              <div class="edit-cell" contenteditable v-html={game.draw} onBlur={(e) => {
                // @ts-ignore
                game.draw = e.target.innerText
              }} />
              <div class="edit-cell" contenteditable v-html={game.lose} onBlur={(e) => {
                // @ts-ignore
                game.lose = e.target.innerText
              }} />
            </>
          })
        }
        <div class="add-game-btn" onClick={addGame}>添加比赛</div>
      </div>
    </div>
  }
})

export default Games
