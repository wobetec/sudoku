import {useState} from "react"
import GameOptions from "./gameOptions"
import Link from 'next/link'

export default function Begin(props) {
    return (
        <div className="Begin">
            {
                (props.level == null)?
                <>
                    <GameOptions setLevel={props.setLevel} setEnd={props.setEnd}/>
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
