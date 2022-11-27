
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
                    {/* <div className="numberField">
                        <div className="number">
                            <BiUndo/>
                        </div>
                    </div> */}
                    <div className="numberField">
                        <div className="number">
                            <FaPencilAlt/>
                        </div>
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
        
        return (
            <div className="numberField">
                <div className={classList} onClick={(e)=>{
                    document.dispatchEvent(new KeyboardEvent("keydown", {"key": cell}))
                }}>
                    {cell}
                    <span>{many[cell-1]}</span>
                </div>
            </div>
        )
        
    }
}