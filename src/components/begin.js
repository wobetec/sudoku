import Link from 'next/link'
import { useContext } from "react"
import GameOptions from "./gameOptions"

import GlobalContext from "../contexts/contextGlobal"

export default function Begin() {
    const globalContext = useContext(GlobalContext)

    return (
        <div className="Begin">
            {
                (globalContext.level == null)?
                <>
                    <GameOptions/>
                </>
                :<>
                    <h1>Congratulations!</h1>
                    <h2>You win!</h2>
                    <Link href="/" onClick={() => window.location.reload()}>Play again!</Link>
                </>
            }
        </div>
    )
}
