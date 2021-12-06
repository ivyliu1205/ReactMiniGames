import React from 'react'
import HeaderBar from '../components/HeaderBar'
import FootBar from '../components/FootBar'
import { strs } from '../data/blanko.js'
import '../styles/Blanko.css'

export default function Blanko () {
    const [currStr, setCurrStr] = React.useState('')
    const [emptyThree, setEmptyThree] = React.useState([0, 1, 2])
    const [currInput, setCurrInput] = React.useState({})
    let newInput = {}

    function getRandomFromArray (array) {
        const randIdx = Math.floor(Math.random() * array.length)
        return array[randIdx]
    }

    const initGame = React.useCallback(() => {
        setCurrInput({})
        // eslint-disable-next-line 
        newInput = {}
        const randomStr = getRandomFromArray(strs)
        setCurrStr(randomStr)

        let possibleIdx = []
        for (let i = 0; i < randomStr.length; i++) {
            if (randomStr[i] !== ' ') {
                possibleIdx.push(i)
            }
        }

        const emptyIdx = []
        for (let i = 0; i < 3; i++) {
            const choosed = getRandomFromArray(possibleIdx)
            possibleIdx = possibleIdx.filter(ele => ele !== choosed)
            emptyIdx.push(choosed)
        }
        setEmptyThree(emptyIdx)
    }, [])

    React.useEffect(() => {
        initGame()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 

    const blocks = currStr.split("").map((ele, idx)=> {
        if (emptyThree.includes(idx)) {
            return (
                <div className="blanko-blocks" key={idx}>
                    <input 
                        type="text" 
                        className="blanko-input-box" 
                        name={idx}
                        value={currInput[idx] !== undefined ? currInput[idx] : ''}
                        onChange={handleChange}
                    ></input>
                </div>
            )
        }
        return (
            <div className="blanko-blocks" key={idx}>
                <div className="blanko-text">{ele}</div>
            </div>
        )
    })

    function checkUserInputs (userInput) {
        let isCorrect = true
        if (Object.values(userInput).length === 3 && !Object.values(userInput).includes('')) {
            for (let k of Object.keys(userInput)) {
                const v = userInput[k]
                if (v !== currStr.charAt(k)) {
                    isCorrect = false
                    break
                }
            }
        } else {
            isCorrect = false
        }
        if (isCorrect) {
            // show success info
            window.alert('Correct!')

            // add n win
            const score = JSON.parse(localStorage.getItem('score'))
            localStorage.setItem('score', JSON.stringify(score + 1))

            // reset
            initGame()
        }
    }

    function handleChange (event) {
        const { name, value } = event.target
        setCurrInput(prevData => ({ ...prevData, [name]: value}))
        newInput[name] = value
        checkUserInputs({ ...currInput, ...newInput})
    }
    

    return (
        <div className="page-container">
            <HeaderBar />
            <div className="container">
                <div id="block-container">
                    {blocks}
                </div>
                <button id="blanko-reset-btn" onClick={initGame}>RESET</button>
            </div>
            <FootBar />
        </div>
    )
}