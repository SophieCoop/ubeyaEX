import React, { useEffect, useState } from 'react';
import '../styles/board.css';


const Board = () => {
    const initialBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
    const EMPTY_STRING = "";

    const [boardGrid, setBoardGrid] = useState([...initialBoard]);
    const [WinTitle, setWinTitle] = useState(EMPTY_STRING);
    const [currentPlayer, setCurrentPlayer] = useState(true);
    const [counter, setCounter] = useState(0);

    const symbol = { true: "X", false: "O" };
    const WON_THE_GAME_TXT = `Game Over! Player ${symbol[!currentPlayer]} won!`;
    const NO_WIN = "Game Over - but no winner";

    useEffect(() => {
        renderBoard();
        detectWin();
    }, [currentPlayer])


    const resetBoard = () => {
        setBoardGrid([...initialBoard]);
        setWinTitle(EMPTY_STRING);
        setCurrentPlayer(true);
        setCounter(0);
    }

    const onClick = (rowIdx, butonIdx) => {
        if (WinTitle === EMPTY_STRING && boardGrid[rowIdx][butonIdx] === "") {
            boardGrid[rowIdx][butonIdx] = symbol[currentPlayer];
            setBoardGrid(boardGrid);
            setCurrentPlayer(!currentPlayer);
            setCounter(counter + 1);
        }
    }

    const Cell = ({ rowIdx, butonIdx, buttonSymbol }) => {
        return (
            <button className="buttonStyle" onClick={() => onClick(rowIdx, butonIdx)}>
                {`${buttonSymbol}`}
            </button>
        )
    }

    const detectWin = () => {
        let columnsX = [0, 0, 0];
        let columnsO = [0, 0, 0];

        boardGrid.some(row => {
            // row check
            if (row[0] === row[1] && row[1] === row[2] && row[0] !== EMPTY_STRING) {
                setWinTitle(WON_THE_GAME_TXT);
                return true;
            }

            // column check
            row.some((cell, index) => {
                if (cell === symbol[true]) {
                    columnsX[index]++;
                }
                else if (cell === symbol[false]) {
                    columnsO[index]++;
                }
            });

            if (columnsX.includes(3) || columnsO.includes(3)) {
                setWinTitle(WON_THE_GAME_TXT);
                return true;
            }
        });

        // diagonals check
        const diagonal1 = boardGrid[0][0] === boardGrid[1][1] && boardGrid[1][1] === boardGrid[2][2] && boardGrid[0][0] !== EMPTY_STRING;
        const diagonal2 = boardGrid[0][2] === boardGrid[1][1] && boardGrid[1][1] === boardGrid[2][0] && boardGrid[0][2] !== EMPTY_STRING;
        if (WinTitle === EMPTY_STRING && (diagonal1 || diagonal2)) {
            setWinTitle(WON_THE_GAME_TXT);
            return;
        }

        // No wins
        if (WinTitle === EMPTY_STRING && counter === 9) {
            setWinTitle(NO_WIN);
            return;
        }

    }

    const renderBoard = () => {
        const items = boardGrid.map((row, index) => {
            return (
                <tr key={index}>
                    <td><Cell rowIdx={index} butonIdx={0} buttonSymbol={row[0]} /></td>
                    <td><Cell rowIdx={index} butonIdx={1} buttonSymbol={row[1]} /></td>
                    <td><Cell rowIdx={index} butonIdx={2} buttonSymbol={row[2]} /></td>
                </tr>
            )
        });

        return (<table>{items}</table>);
    }

    return (
        <div className="boardContainer">
            { WinTitle === EMPTY_STRING ?
                <div>
                    <h1> Welcome to tic tac toe game! </h1>
                    <h2> {`Turn: ${symbol[currentPlayer]}`}</h2>
                </div>
                : <h1>{WinTitle}</h1>}

            {renderBoard()}
            
            {WinTitle !== EMPTY_STRING ? <button className="newGameBtn" onClick={resetBoard}>New Game</button> : null}
        </div>
    )
}


export default Board;