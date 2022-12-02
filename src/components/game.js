import { useContext, useEffect, useState } from "react";

import Board from './board';
import GameOptions from './gameOptions';
import Keyboard from './keyboard';

import games from "../../boards/games.json";
import GlobalContext from "../contexts/contextGlobal";
import GameContext from "../contexts/contextGame";

export default function Sudoku() {
    const globalContext = useContext(GlobalContext)

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

    const [main, setMain] = useState(initial)
    const [game, setGame] = useState(getGame(initial))
    const [selected, setSelected] = useState([-1, -1])
    const [keyboardSelected, setKeyboardSelected] = useState(-1)
    const [subscribe, setSubscribe] = useState(false)
    const [del, setDel] = useState(false)
    const [back, setBack] = useState([])

    const wrong = thereIsWrong(game)
    const marked = getMarked(game, selected, keyboardSelected)

    function getGame(matrix) {
        let game = []
    
        for (let i = 0; i < 9; i++) {
            let now = []
            for (let j = 0; j < 9; j++) {
                let obj = {
                    value: null,
                    initial: true,
                    wrong: false,
                    thereIsSubscribe: false,
                    subscribe: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    position: [i, j]
                }
    
                if (matrix[i][j] == 0) {
                    obj.initial = false
                } else {
                    obj.value = matrix[i][j]
                }
    
                now.push(obj)
            }
            game.push(now)
        }
    
        return game
    }
    
    function getMarked(game, selected, keyboardSelected) {
        if (keyboardSelected != -1) {
            return keyboardSelected
        } else if (selected[0] != -1 && selected[1] != -1) {
            return game[selected[0]][selected[1]].value
        } else {
            return -1
        }
    }
    
    function thereIsWrong(game) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (game[i][j].wrong) {
                    return true
                }
            }
        }
        return false
    }

    function changeGame(game, position, value, subscribe){

        let newGame = JSON.parse(JSON.stringify(game))

        if(value == null){
            newGame[position[0]][position[1]].value = null
            newGame[position[0]][position[1]].subscribe = [0, 0, 0, 0, 0, 0, 0, 0, 0]
            newGame[position[0]][position[1]].thereIsSubscribe = false
        }

        if(!subscribe){
            if (newGame[position[0]][position[1]].value == value) {
                newGame[position[0]][position[1]].value = null
            } else {
                newGame[position[0]][position[1]].value = value
                newGame[position[0]][position[1]].wrong = false
            }
            newGame[position[0]][position[1]].subscribe = [0, 0, 0, 0, 0, 0, 0, 0, 0]
            newGame[position[0]][position[1]].thereIsSubscribe = false
        }else{
            if(newGame[position[0]][position[1]].subscribe[value-1] == 1){
                newGame[position[0]][position[1]].subscribe[value-1] = 0
            }else{
                newGame[position[0]][position[1]].subscribe[value-1] = 1
                newGame[position[0]][position[1]].thereIsSubscribe = true
            }
            if(!newGame[position[0]][position[1]].subscribe.includes(1)){
                newGame[position[0]][position[1]].thereIsSubscribe = false
            }
        }
        setGame(newGame)
    }

    function checkIfFull(game){
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (game[i][j].value == null) {
                    return false
                }
            }
        }
        return true
    }

    function checkWrongs(game, main){
        setSelected([-1, -1])
        let thereIs = false
        let newGame = JSON.parse(JSON.stringify(game))
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (newGame[i][j].value != null && newGame[i][j].value != main["full"][i][j]) {
                    newGame[i][j].wrong = true
                    thereIs = true
                }
            }
        }
        if(thereIs){
            setGame(newGame)
        }
    }

    function done(game, main){
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (game[i][j].value != main["full"][i][j]) {
                    return false
                }
            }
        }
        return true
    }


    // Set the game based on Level, run every time level change
    useEffect(() => {

        let gamesLevel = games[globalContext.level]
        let selectedGame = gamesLevel.list[Math.floor(Math.random() * gamesLevel.length)]
        
        setMain(selectedGame)
        setGame(getGame(selectedGame.initial))
        
    }, [globalContext.level])


    // Check for wrong answers when game was finished
    useEffect(() => {
        let finished = checkIfFull(game)

        setBack([...back.slice(-9), game])

        if(finished) {
            if(done(game, main)){
                globalContext.setEnd(true)
            }
        }
    }, [game])

     
    // Handle all inputs from keyboard
    useEffect(() => {
        function handle(e) {
            if (/^[1-9]$/i.test(e.key)) {
                if (selected[0] != -1 && selected[1] != -1) {
                    changeGame(game, selected, e.key, subscribe)
                }
            } else if (e.key == "Delete" || e.key == "Backspace") {
                if (selected[0] != -1 && selected[1] != -1) {
                    changeGame(game, selected, null, subscribe)
                }
            } else if (e.key == "Escape") {
                setSelected([-1, -1])
                setKeyboardSelected(-1)
                setDel(false)
                setSubscribe(false)
            } else if (e.key == "v") {
                checkWrongs(game, main)
            } else if (e.key == "c") { //developer only
                for (let i = 0; i < 9; i++) {
                    for (let j = 0; j < 9; j++) {
                        if (game[i][j].value == null) {
                            let newGame = JSON.parse(JSON.stringify(game))
                            newGame[i][j].value = main["full"][i][j]
                            setGame(newGame)
                            break
                        }
                    }
                }
            }
        }

        function handlerClick(e) {
            if (!e.target.classList.contains('keys') && !["path", "svg"].includes(e.target.tagName)) {
                document.dispatchEvent(new KeyboardEvent("keydown", { "key": "Escape" }))
            }
        }

        document.addEventListener("keydown", handle)
        document.addEventListener("click", handlerClick)

        return () => {
            document.removeEventListener("keydown", handle)
            document.removeEventListener("click", handlerClick)
        }
    }, [selected, game])


    return (
        <GameContext.Provider
            value={{
                main, setMain,
                game, setGame,
                selected, setSelected,
                keyboardSelected, setKeyboardSelected,
                subscribe, setSubscribe,
                back, setBack,
                del, setDel,
                state:{
                    wrong,
                    marked,
                },
                functions:{
                    changeGame
                },
            }}>
            <div className="Sudoku">
                <Board/>
                <div className="menu">
                    <GameOptions/>
                    <Keyboard/>
                </div>
            </div>
        </GameContext.Provider>
    )

}
