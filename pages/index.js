import Sudoku from "../src/components/game"
import Begin from "../src/components/begin"
import GlobalContext from "../src/contexts/contextGlobal.js"
import {useContext} from "react" 

export default function Home() {
    const globalContext = useContext(GlobalContext)

    return (
        <div className="Home">
            <h1>Sudoku</h1>
            {
                (!globalContext.end && globalContext.level!=null)?
                <Sudoku/>
                :<Begin/>
            }
            <p>Made by <a href="https://wobetec.github.io/portfolio/" target="_blank" >Wobetec</a></p>
        </div>
    )
}
