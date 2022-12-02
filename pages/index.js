import Sudoku from "../src/components/game"
import Begin from "../src/components/begin"
import GlobalContext from "../src/contexts/contextGlobal" 

import {useState, useEffect} from "react"

export default function Home() {

    const [end, setEnd] = useState(null)
    const [level, setLevel] = useState(null)


    return (
        <div className="Home">
            <h1>Sudoku</h1>
            {
                (!end && level!=null)?
                <Sudoku setEnd={setEnd} level={level} setLevel={setLevel}/>
                :<Begin setEnd={setEnd} setLevel={setLevel} end={end} level={level}/>
            }
            <p>Made by <a href="https://wobetec.github.io/portfolio/" target="_blank" >Wobetec</a></p>
        </div>
    )
}
