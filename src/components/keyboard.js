
import {FaIgloo, FaPencilAlt} from "react-icons/fa"
import {FiDelete} from "react-icons/fi"
import {BiUndo} from "react-icons/bi"
import {BsCheckLg} from "react-icons/bs"
import { useContext } from "react";
import GameContext from "../contexts/contextGame";

export default function Keyboard(){
    const gameContext = useContext(GameContext)

    function getMany(game){
        let many = [0, 0, 0, 0, 0, 0, 0, 0, 0]

        for(let i = 0; i < 9; i++){
            for(let j = 0; j < 9; j++){
                if(game[i][j].value != null){
                    many[game[i][j].value-1]++
                }
            }
        }

        return many
    }

    var many = getMany(gameContext.game)

    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <div className="Keyboard keys">
            <div className="keyboard-numbers keys">
                { RowTpt(numbers.slice(0, 3)) }
                { RowTpt(numbers.slice(3, 6)) }
                { RowTpt(numbers.slice(6, 9)) }
            </div>
            <div className="game-options keys">
                <div className="row-tpt keys">
                    <div className="numberField keys" onClick={(e)=>{
                            if(gameContext.selected[0]!=-1){
                                document.dispatchEvent(new KeyboardEvent("keydown", {"key": "Delete"}))
                            }else{
                                gameContext.setDel(!gameContext.del)
                            }
                        }}>
                            {
                            (gameContext.del)?
                            <div className="keys number selected">
                                <FiDelete/>
                            </div>
                            :
                            <div className="keys number">
                                <FiDelete/>
                            </div>
                        }
                    </div>
                    <div className="keys numberField">
                        <div className="keys number" onClick={(e)=>{
                            if(gameContext.back.length >= 3){
                                let temp = gameContext.back.pop()
                                gameContext.setGame(gameContext.back.pop())
                            }
                        }}>
                            <BiUndo/>
                        </div>
                    </div> 
                    <div className="keys numberField"onClick={(e)=>{
                            document.dispatchEvent(new KeyboardEvent("keydown", {"key": "v"}))
                        }}>
                        <div className="keys number">
                            <BsCheckLg/>
                        </div>
                    </div> 
                    <div className="keys numberField" onClick={(e)=>{
                        gameContext.setSubscribe(!gameContext.subscribe)
                        
                    }}> 
                        {
                            (gameContext.subscribe)?
                            <div className="keys number selected">
                                <FaPencilAlt/>
                            </div>
                            :
                            <div className="keys number">
                                <FaPencilAlt/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

    
    function RowTpt(three){
        return (
            <div className="keys row-tpt">
                { NumberField(three[0]) }
                { NumberField(three[1]) }
                { NumberField(three[2]) }
            </div>
        )
    }


    function NumberField(cell){
            
        let classList = "keys number"

        if(gameContext.keyboardSelected == cell){
            classList += " selected"
        }
        
        return (
            <div className="keys numberField">
                <div className={classList} onClick={(e)=>{
                    if(gameContext.selected[0] != -1 && gameContext.selected[1] != -1){
                        document.dispatchEvent(new KeyboardEvent("keydown", {"key": cell}))
                    }else{
                        if(e.target.classList.contains("selected")){
                            gameContext.setKeyboardSelected(-1)
                        }else{
                            gameContext.setKeyboardSelected(cell)
                        }
                    }

                }}>
                    {cell}
                    <span>{9 - many[cell-1]}</span>
                </div>
            </div>
        )
        
    }
}