

export default function GameOptions(props){
    function handlerLevel(e){
        props.setEnd(false)
        props.setLevel(e.target.value)
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

