import Sudoku from "../src/components/game"

export default function Home() {
    return (
        <div className="Home">
            <h1>Sudoku</h1>
            <Sudoku/>
            <p>Made by <a href="https://wobetec.github.io/portfolio/" target="_blank" >Wobetec</a></p>
        </div>
    )
}
