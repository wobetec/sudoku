
import {FaIgloo, FaPencilAlt} from "react-icons/fa"
import {FiDelete} from "react-icons/fi"
import {BiUndo} from "react-icons/bi"

export default function Keyboard(props){


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

    var many = getMany(props.game)

    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <div className="Keyboard">
            <div className="keyboard-numbers">
                { RowTpt(numbers.slice(0, 3)) }
                { RowTpt(numbers.slice(3, 6)) }
                { RowTpt(numbers.slice(6, 9)) }
            </div>
            <div className="game-options">
                <div className="row-tpt">
                    <div className="numberField">
                        <div className="number" onClick={(e)=>{
                            document.dispatchEvent(new KeyboardEvent("keydown", {"key": "Delete"}))
                        }}>
                            <FiDelete/>
                        </div>
                    </div>
                    <div className="numberField">
                        <div className="number">
                            <BiUndo/>
                        </div>
                    </div> 
                    <div className="numberField" onClick={(e)=>{
                        console.log(props.subscribe)
                        if(props.subscribe){
                            props.setSubscribe(false)
                        }else{
                            props.setSubscribe(true)
                        }
                    }}> 
                        {
                            (props.subscribe)?
                            <div className="number selected">
                                <FaPencilAlt/>
                            </div>
                            :
                            <div className="number">
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
            <div className="row-tpt">
                { NumberField(three[0]) }
                { NumberField(three[1]) }
                { NumberField(three[2]) }
            </div>
        )
    }


    function NumberField(cell){
            
        let classList = "number"

        if(props.keyboardSelected == cell){
            classList += " selected"
        }
        
        return (
            <div className="numberField">
                <div className={classList} onClick={(e)=>{
                    if(props.selected[0] != -1 && props.selected[1] != -1){
                        document.dispatchEvent(new KeyboardEvent("keydown", {"key": cell}))
                    }else{
                        if(e.target.classList.contains("selected")){
                            props.setKeyboardSelected(-1)
                        }else{
                            props.setKeyboardSelected(cell)
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