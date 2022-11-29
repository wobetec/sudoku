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

    function checkEnd(nowGame){
        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(nowGame[i][j].value == null){
                    return false
                }
            }
        }
        return true
    }

    function getMarked(game, selected, keyboardSelected) {
        if(keyboardSelected != -1){
            return keyboardSelected
        }else if(selected[0] != -1 && selected[1] != -1){
            return game[selected[0]][selected[1]].value
        }else{
            return -1
        }
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
    const [keyboardSelected, setKeyboardSelected] = useState(-1)
    const [subscribe, setSubscribe] = useState(false)

    const marked = getMarked(game, selected, keyboardSelected)
    console.log(selected)
    
    useEffect(()=>{
        function handle(e){
            if(/^[1-9]$/i.test(e.key)){
                if(selected[0] != -1 && selected[1] != -1){
                    let newGame = JSON.parse(JSON.stringify(game))
                    if(newGame[selected[0]][selected[1]].value == e.key){
                        newGame[selected[0]][selected[1]].value = null
                    }else{
                        newGame[selected[0]][selected[1]].value = e.key
                    }
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
            <Board game={game} setGame={setGame} setSelected={setSelected} selected={selected} marked={marked} keyboardSelected={keyboardSelected} setKeyboardSelected={setKeyboardSelected}/>
            <div className="menu">
                <GameOptions />
                <Keyboard game={game} selected={selected} keyboardSelected={keyboardSelected} setKeyboardSelected={setKeyboardSelected} subscribe={subscribe} setSubscribe={setSubscribe} />
            </div>
        </div>
    )
    
}