import GlobalContext from "../contexts/contextGlobal"
import { useContext } from "react"

export default function GameOptions() {

    const globalContext = useContext(GlobalContext)

    function handlerLevel(e) {
        globalContext.setEnd(false)
        globalContext.setLevel(e.target.value)
    }

    return (
        <div className="GameOptions">
            <select className="level" onChange={(e) => handlerLevel(e)} defaultValue="Level">
                <option disabled value="Level">Level</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>
    )
}

