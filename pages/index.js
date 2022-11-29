import Sudoku from "../src/components/game"
import Head from 'next/head';

export default function Home() {
    return (<>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Signika+Negative:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
            </Head>
            <div className="Home">
                <h1>Sudoku</h1>
                <Sudoku/>
                <p>Made by <a href="https://wobetec.github.io/portfolio/" target="_blank" >Wobetec</a></p>
            </div>
        </>
    )
}
