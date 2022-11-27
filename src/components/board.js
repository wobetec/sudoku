


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

export default function Board(props){
    let tpts = getTpt(props.game)

    return (
        <div className="Board">
            { BoardRow(tpts.slice(0, 3)) }
            { BoardRow(tpts.slice(3, 6)) }
            { BoardRow(tpts.slice(6, 9)) }
        </div>
    )

    function BoardRow(three){
        return (
            <div className="row">
                { Tpt(three[0]) }
                { Tpt(three[1]) }
                { Tpt(three[2]) }
            </div>
        )
    }

    function Tpt(tpt){
        return (
            <div className="Tpt">
                { RowTpt(tpt.slice(0, 3)) }
                { RowTpt(tpt.slice(3, 6)) }
                { RowTpt(tpt.slice(6, 9)) }
            </div>
        )
    }
    
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
    
        if(cell.value != null && cell.initial){
            classList += " initial"
        }else if(cell.value != null){
            classList = classList
            if(cell.position[0] == props.selected[0] && cell.position[1] == props.selected[1]){
                classList += " selected"
            }
        }else{
            classList += " empty"
            if(cell.position[0] == props.selected[0] && cell.position[1] == props.selected[1]){
                classList += " selected"
            }
        }
        
        return (
            <div className="numberField" onClick={ (e)=>{
                if(!cell.initial){
                    if(e.target.classList.contains("selected")){
                        props.setSelected([-1, -1])
                    }else{
                        props.setSelected(cell.position)
                    }
                }
            }}>
                <div className={classList}>
                    {cell.value}
                </div>
            </div>
        )
        
    }
}




