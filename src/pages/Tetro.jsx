import React from 'react'
import HeaderBar from '../components/HeaderBar'
import FootBar from '../components/FootBar'
import '../styles/Tetro.css'

export default function Tetro () {
    const [ board, setBoard ] = React.useState([])
    const [ gameStart, setGameStart ] = React.useState(false)
    const [ nGreen, setNGreen ] = React.useState(0)
    const types = [
        [[0, 0], [0, 1], [1, 0], [1, 1]],   // 2 x 2
        [[0, 0]],   // 1 x 1
        [[0, 0], [0, 1]]    // 2 x 1 
    ]

    function getRandomFromArray (array) {
        const randIdx = Math.floor(Math.random() * array.length)
        return array[randIdx]
    }

    function setInitBoard () {
        const initBoard = []
        for (let i = 0; i < 12; i++) {
            const newRow = []
            for (let j = 0; j < 10; j++) {
                newRow.push(0)
            }
            initBoard.push(newRow)
        }
        setBoard(initBoard)
    } 

    React.useEffect(setInitBoard, [])

    React.useEffect(() => {
        let timer = null
        if (gameStart) {
            timer = setInterval(() => {
                let prevBlock = getPrevBlock()
                prevBlock = prevBlock.sort((x, y) => (x[0] < y[0]) ? 1 : (x[0] > y[0]) ? -1 : 0)
    
                let maxHeight = 11
                // eslint-disable-next-line
                prevBlock.map(ele => {
                    const currHeight = getHeightByCol(ele[1])
                    if (currHeight < maxHeight) {
                        maxHeight = currHeight
                    }
                })

                // Falied
                if (maxHeight <= 1) {
                    window.alert('Failed')
                    handleReset()
                }
    
                if (prevBlock[0][0] < 11 && prevBlock[0][0] < maxHeight) {
                    const newBlock = prevBlock.map(ele => [ele[0] + 1, ele[1]])
                    blockProjection(newBlock)
                } else if (prevBlock[0][0] === maxHeight) {
                    blockProjection(prevBlock, 3)

                    turnGreen()
                    // eslint-disable-next-line
                    prevBlock.map(ele => {
                        const currHeight = getHeightByCol(ele[1])
                        if (currHeight < maxHeight) {
                            maxHeight = currHeight
                        }
                    })
                    const randomStart = getRandomFromArray(types)
                    blockProjection(randomStart)
                }
            }, 500)
        }
        // eslint-disable-next-line
        return () => clearInterval(timer)
    // eslint-disable-next-line
    }, [gameStart])

    React.useEffect(() => {
        if (nGreen >= 4) {
            window.alert('Congrats!')
            handleReset()
        }
    // eslint-disable-next-line
    }, [nGreen])

    const blocks = board.map((row, rowIdx) => {
        const blockRows = row.map((cell, colIdx) => {
            if (cell === 0) {
                return <div key={colIdx} className="board-cells" name={rowIdx} value={colIdx}></div>
            } else if (cell === 1) {
                return <div key={colIdx} className="occupied-board-cells" name={rowIdx} value={colIdx}></div>
            } else if (cell === 3) {
                return <div key={colIdx} className="occupied-board-cells" name={rowIdx} value={colIdx}></div>
            } else {
                return <div key={colIdx} className="finished-board-cells" name={rowIdx} value={colIdx}></div>
            }
        })
        return (
            <div className="board-rows" key={rowIdx}>
                {blockRows}
            </div>
        )
    })

    function getPrevBlock () {
        const prev = []
        board.map((row, rowIdx) => {
            row.map((col, colIdx) => {
                if (col === 1) {
                    prev.push([rowIdx, colIdx])
                }
                return col
            })
            return row
        })
        return prev
    }

    function getHeightByCol (colIdx) {
        let height = 12
        for (let i = 2; i < 12; i++) {
            if (board[i][colIdx] === 2 || board[i][colIdx] === 3) {
                height = i
                break
            }
        }
        return height - 1
    }

    function turnGreen () {
        const line = []
        for (let i = 0; i < 12; i++) {
            if (board[i].filter(x => x === 0).length === 0) {
                for (let j = 0; j < 10; j++) {
                    line.push([i, j])
                }
            }
        }
        if (line.length > 0) {
            blockProjection(line, 2)
            setNGreen(nGreen + 1)
        }
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 37) {
            // move to left
            let prevBlock = getPrevBlock()
            prevBlock = prevBlock.sort((x, y) => (x[1] > y[1]) ? 1 : (x[1] < y[1]) ? -1 : 0)

            if (prevBlock[0][1] > 0) {
                const newBlock = prevBlock.map(ele => [ele[0], ele[1] - 1])
                blockProjection(newBlock)
            }
        } else if (event.keyCode === 39) {
            // move to right
            let prevBlock = getPrevBlock()
            prevBlock = prevBlock.sort((x, y) => (x[1] < y[1]) ? 1 : (x[1] > y[1]) ? -1 : 0)
            
            if (prevBlock[0][1] < 9) {
                const newBlock = prevBlock.map(ele => [ele[0], ele[1] + 1])
                blockProjection(newBlock)
            }
        }
    }

    function handleReset () {
        setGameStart(false)
        window.removeEventListener('keydown', handleKeyDown)
        setInitBoard()
        setNGreen(0)

        const score = JSON.parse(localStorage.getItem('score'))
        localStorage.setItem('score', JSON.stringify(score + 1))
    }

    // show curr block to board
    function blockProjection (rawblocks, val=1) {
        const newBoard = board.slice()
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < 10; j++) {
                if (newBoard[i][j] === 1) {
                    newBoard[i][j] = 0
                }
            }
        }

        for (let idx = 0; idx < rawblocks.length; idx++) {
            newBoard[rawblocks[idx][0]][rawblocks[idx][1]] = val
        }
        setBoard(newBoard)    
    }

    function handleClick () {
        setGameStart(true)
        if (gameStart) {
            return
        }
        window.addEventListener('keydown', handleKeyDown)

        // show new block
        const randomStart = getRandomFromArray(types)
        blockProjection(randomStart)
    }

    return (
        <div className="page-container">
            <HeaderBar />
            <div className="container">
                <div id="board-container" onClick={handleClick}>
                    {blocks}
                </div>
                <button id="tetro-reset-btn" onClick={handleReset}>
                    RESET
                </button>
            </div>
            <FootBar />
        </div>
    )
}