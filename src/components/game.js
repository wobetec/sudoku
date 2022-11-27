import { useEffect, useState } from "react"

import Board from './board';
import Keyboard from './keyboard';
import GameOptions from './gameOptions';

export default function Sudoku(){

    function getGame(matrix){
        let game = []

        for(let i = 0; i < 9; i++){
            let now = []
            for(let j = 0; j < 9; j++){
                let obj = {
                    value: null,
                    initial: true,
                    wront: false,
                    subscribe: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    position: [i, j]
                }

                if(matrix[i][j] == 0){
                    obj.initial = false
                }else{
                    obj.value = matrix[i][j]
                }

                now.push(obj)
            }
            game.push(now)
        }

        return game
    }

    var initial = [
        [4, 7, 9, 0, 1, 2, 0, 0, 0],
        [0, 3, 0, 6, 7, 0, 0, 1, 0],
        [1, 0, 2, 9, 0, 0, 7, 0, 4],
        [0, 0, 0, 0, 4, 0, 5, 6, 8],
        [6, 8, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 8, 6, 3, 0, 9, 0],
        [3, 4, 0, 0, 8, 0, 9, 0, 0],
        [0, 2, 0, 4, 0, 0, 8, 0, 0],
        [8, 0, 1, 5, 2, 0, 4, 0, 0]
    ]

    const [game, setGame] = useState(getGame(initial))
    const [selected, setSelected] = useState([-1, -1])
    

    useEffect(()=>{
        function handle(e){
            if(/^[1-9]$/i.test(e.key)){
                if(selected[0] != -1 && selected[1] != -1){
                    let newGame = JSON.parse(JSON.stringify(game))
                    newGame[selected[0]][selected[1]].value = e.key
                    setGame(newGame)
                }
            }else if(e.key == "Delete" || e.key == "Backspace"){
                if(selected[0] != -1 && selected[1] != -1){
                    let newGame = JSON.parse(JSON.stringify(game))
                    newGame[selected[0]][selected[1]].value = null
                    setGame(newGame)
                }
            }
        }

        document.addEventListener("keydown", handle)

        return ()=>document.removeEventListener("keydown", handle)
    }, [selected, game])


    return (
        <div className="Sudoku">
            <Board game={game} setSelected={setSelected} selected={selected} test="a"/>
            <div className="menu">
                <GameOptions />
                <Keyboard game={game}/>
            </div>
        </div>
    )
    
}