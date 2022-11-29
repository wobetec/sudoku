

function checkSolution(board){
    //rows
    for(let i=0; i<9; i++) {
        let count = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        for(let j=0; j<9; j++) {
            if(board[j][i]== null){
                return false
            }
            if(count[board[i][j].value - 1] == 1){
                return false
            }else{
                count[board[i][j].value - 1] = 1
            }
        }
    }

    //colums
    for(let i=0; i<9; i++) {
        let count = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        for(let j=0; j<9; j++) {
            if(board[j][i]== null){
                return false
            }
            if(count[board[j][i].value - 1] == 1){
                return false
            }else{
                count[board[j][i].value - 1] = 1
            }
        }
    }

    //tpt
    
}