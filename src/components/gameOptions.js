import GlobalContext from "../contexts/contextGlobal"
import { useContext } from "react"

export default function GameOptions() {

    const globalContext = useContext(GlobalContext)

    function handlerLevel(e) {
        globalContext.setEnd(false)
        globalContext.setLevel(e.target.value)
    }

    let placeHolder = null
    if(globalContext.level == null){
        placeHolder = "Level"
    }else{
        placeHolder = globalContext.level
    }

    return (
        <div className="GameOptions">
            <select className="level" onChange={(e) => handlerLevel(e)} defaultValue={placeHolder}>
                <option disabled value="Level">Level</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
    )
}

