import React from 'react'
import HeaderBar from '../components/HeaderBar'
import FootBar from '../components/FootBar'
import '../styles/Slido.css'
import a from '../data/shrek/1.png'
import b from '../data/shrek/2.png'
import c from '../data/shrek/3.png'
import d from '../data/shrek/4.png'
import e from '../data/shrek/5.png'
import f from '../data/shrek/6.png'
import g from '../data/shrek/7.png'
import h from '../data/shrek/8.png'

export default function Slido () {
    const results = [a, b, c, d, e, f, g, h, '']
    const [game, setGame] = React.useState([])
    const [disable, setDisable] = React.useState(false);
    const connected = {
        0: [1, 3],
        1: [0, 2, 4],
        2: [1, 5],
        3: [0, 4, 6],
        4: [1, 3, 5, 7],
        5: [2, 4, 8],
        6: [3, 7],
        7: [4, 6, 8],
        8: [7, 5]
    }

    function shuffleArray(array) {
        const newArr = array.slice()
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr
    }

    React.useEffect(() => {
        setGame(shuffleArray(results))
        // eslint-disable-next-line
    }, [])

    const blocks = game.map((ele, idx) => {
        if (ele === '') {
            return <div className="slido-blocks" name={idx} ></div>
        }
        return <img className="slido-blocks" src={ele} name={idx} onClick={handleClick} alt={'img ' + idx} />
    })

    const checkStatus = () => {
        let isEqual = true
        for (let idx = 0; idx < 9; idx++) {
            if (results[idx] !== game[idx]) {
                isEqual = false
                break
            }
        }
        if (isEqual) {
            window.alert('Correct!')

            const score = JSON.parse(localStorage.getItem('score'))
            localStorage.setItem('score', JSON.stringify(score + 1))
            
            setGame(shuffleArray(results))
            setDisable(false)
        }
    }

    function getNextStep (curr) {
        let moveTo = null
        for (const conn of connected[curr]) {
            if (game[conn] === '') {
                moveTo = conn
                break
            }
        }
        return moveTo
    }

    function handleClick (event) {
        const { name } = event.target

        let moveTo = getNextStep(name)

        const newGame = game.slice()
        if (moveTo !== null) {
            newGame[moveTo] = newGame[name]
            newGame[name] = ''
            setGame(newGame)
            setDisable(false)
        }
    }

    React.useEffect (() => {
        if (!disable) {
            checkStatus()
        }
    // eslint-disable-next-line
    }, [game])

    function handleSolve () {
        setGame(results)
        setDisable(true)
    }

    function handleReset () {
        setGame(shuffleArray(results))
        setDisable(false)
    }

    return (
        <div className="page-container">
            <HeaderBar />
            <div className="container">
                <div id="slido-container">
                    <div className="slido-block-rows">
                        {blocks[0]}
                        {blocks[1]}
                        {blocks[2]}
                    </div>
                    <div className="slido-block-rows">
                        {blocks[3]}
                        {blocks[4]}
                        {blocks[5]}
                    </div>
                    <div className="slido-block-rows">
                        {blocks[6]}
                        {blocks[7]}
                        {blocks[8]}
                    </div>
                </div>
                <div id="slido-btn-container">
                    <button id="slido-solve-btn" disabled={disable} onClick={handleSolve}>Solve</button>
                    <button id="slido-reset-btn" disabled={!disable} onClick={handleReset}>Reset</button>
                </div>
            </div>
            <FootBar />
        </div>
    )
}