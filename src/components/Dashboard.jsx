import React from 'react'
import HeaderBar from './HeaderBar'
import FootBar from './FootBar'

export default function Dashboard () {
    const [nGames, setNGames] = React.useState(0)
    
    async function getScore () {
        return fetch('http://cgi.cse.unsw.edu.au/~cs6080/data/score.json', {
            method: 'GET'
        })
        .then(data => data.json())
    }

    React.useEffect(() => {
        async function setScore () {
            const iniScore = await getScore()
            setNGames(iniScore.score)
            localStorage.setItem('score', JSON.stringify(iniScore.score))
        }
        
        const score = JSON.parse(localStorage.getItem('score'))   
        if (score === undefined || score === null) {
            setScore()
        }
        setNGames(score)
    }, [])

    async function resetValue () {
        const initScore = await getScore()
        localStorage.setItem('score', JSON.stringify(initScore.score))
        setNGames(initScore.score)
    }

    return (
        <div className="page-container">
            <HeaderBar />
            <div className="container">
                <div id="infos">
                    <div id="main-title">
                        Please choose an option from the navbar.
                    </div>
                    <div id="sub-title">
                        Games won: {nGames} <button onClick={resetValue}>(reset)</button>
                    </div>
                </div>
            </div>
            <FootBar />
        </div>
    )
}