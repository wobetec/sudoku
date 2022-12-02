import "../styles/global.sass"
import "../styles/game.sass"
import GlobalContext from "../src/contexts/contextGlobal" 
import { useState } from "react"


function MyApp({ Component, pageProps }) {

	const [end, setEnd] = useState(null)
	const [level, setLevel] = useState(null)

	return(
		<GlobalContext.Provider
			value={{
				end, setEnd,
				level, setLevel,
			}}>
				<Component {...pageProps} />
			</GlobalContext.Provider>
	)
}

export default MyApp