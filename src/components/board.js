import { useContext, useEffect } from "react";
import GameContext from "../contexts/contextGame";

export default function Board(){
    const gameContext = useContext(GameContext)
    let tpts = getTpt(gameContext.game)

    return (
        <div className="Board keys">
            { BoardRow(tpts.slice(0, 3)) }
            { BoardRow(tpts.slice(3, 6)) }
            { BoardRow(tpts.slice(6, 9)) }
        </div>
    )

    function BoardRow(three){
        return (
            <div className="row keys">
                { Tpt(three[0]) }
                { Tpt(three[1]) }
                { Tpt(three[2]) }
            </div>
        )
    }

    function Tpt(tpt){
        return (
            <div className="Tpt keys">
                { RowTpt(tpt.slice(0, 3)) }
                { RowTpt(tpt.slice(3, 6)) }
                { RowTpt(tpt.slice(6, 9)) }
            </div>
        )
    }
    
    function RowTpt(three){
        return (
            <div className="row-tpt keys">
                { NumberField(three[0]) }
                { NumberField(three[1]) }
                { NumberField(three[2]) }
            </div>
        )
    }
    
    function NumberField(cell){
        let classList = "keys number"
        if(cell.initial){ // Initial cells
            classList += " initial"
            if(cell.value == gameContext.state.marked){
                classList += " marked"
            }
        }else if(cell.value != null){ // Not empty
            if(cell.position[0] == gameContext.selected[0] && cell.position[1] == gameContext.selected[1]){
                classList += " selected"
            }else if(cell.value == gameContext.state.marked){
                classList += " marked"
            }else if(cell.wrong){
                classList += " wrong"
            }
        }else if (cell.thereIsSubscribe){
            classList += " subscribed"
            if(cell.position[0] == gameContext.selected[0] && cell.position[1] == gameContext.selected[1]){
                classList += " selected"
            }else if(cell.subscribe[gameContext.state.marked - 1]){
                classList += " marked"
            }
        }else{
            classList += " empty"
            if(cell.position[0] == gameContext.selected[0] && cell.position[1] == gameContext.selected[1]){
                classList += " selected"
            }
        }

        function handleClick(e){
            e.preventDefault()
            if(!cell.initial){
                if(gameContext.keyboardSelected != -1 && gameContext.selected[0] == -1){
                    gameContext.functions.changeGame(gameContext.game, cell.position, gameContext.keyboardSelected, gameContext.subscribe)
                }else{
                    if(cell.position[0] == gameContext.selected[0] && cell.position[0] == gameContext.selected[0]){
                        gameContext.setKeyboardSelected(-1)
                        gameContext.setSelected([-1, -1])
                    }else if(cell.thereIsSubscribe){
                        gameContext.setSelected(cell.position)
                    }else{
                        gameContext.setSelected(cell.position)
                        gameContext.setKeyboardSelected(cell.value)
                    }
                }
            }else{
                gameContext.setSelected([-1, -1])
                if(cell.value == gameContext.state.marked){
                    gameContext.setKeyboardSelected(-1)
                }else{
                    gameContext.setKeyboardSelected(cell.value)
                }
            }
        }


        return (
            <div className="numberField keys"  onClick={ (e)=>{ handleClick(e)}}>
                {
                    (cell.thereIsSubscribe && cell.value == null)?
                    <div className={classList} >
                        <div className="row-subscribe keys">
                            <div className="col-subscribe keys">
                                {
                                    (cell.subscribe[8])?
                                    <>9</>
                                    :<></>
                                }
                            </div>
                            <div className="col-subscribe keys">
                                {
                                    (cell.subscribe[7])?
                                    <>8</>
                                    :<></>
                                }
                            </div>
                            <div className="col-subscribe keys">
                                {
                                    (cell.subscribe[6])?
                                    <>7</>
                                    :<></>
                                }
                            </div>
                        </div>
                        <div className="row-subscribe keys">
                            <div className="col-subscribe keys">
                                {
                                    (cell.subscribe[5])?
                                    <>6</>
                                    :<></>
                                }
                            </div>
                            <div className="col-subscribe keys">
                                {
                                    (cell.subscribe[4])?
                                    <>5</>
                                    :<></>
                                }
                            </div>
                            <div className="col-subscribe keys">
                                {
                                    (cell.subscribe[3])?
                                    <>4</>
                                    :<></>
                                }
                            </div>
                        </div>
                        <div className="row-subscribe keys">
                            <div className="col-subscribe keys">
                                {
                                    (cell.subscribe[2])?
                                    <>3</>
                                    :<></>
                                }
                            </div>
                            <div className="col-subscribe keys">
                                {
                                    (cell.subscribe[1])?
                                    <>2</>
                                    :<></>
                                }
                            </div>
                            <div className="col-subscribe keys">
                                {
                                    (cell.subscribe[0])?
                                    <>1</>
                                    :<></>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div className={classList} onClick={ (e)=>{ handleClick(e) }}>
                        {cell.value}
                    </div>
                }
            </div>
        )
    }
}

function getTpt(game){
    var tpts = []
    
    for(let a = 0; a < 3; a++){
        for(let b = 0; b < 3; b++){
            let tpt = []
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    tpt.push(game[i+a*3][j+b*3])
                }
            }
            tpts.push(tpt)
        }
    }
    
    return tpts
}





