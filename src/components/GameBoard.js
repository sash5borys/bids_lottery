import React from 'react'
import './GameBoard.css'

export const GameBoard = () => {
    return (
        <>
            <section className="game_board">
                <h2>Lottery:1</h2>
                <h3>Ballance:3 ETH</h3>
                <details>
                    <summary>Players(1):</summary>
                    <ul>
                        <li>
                            <a href="">0x...</a>
                        </li>
                    </ul>
                </details>
                <button>Enter</button>
                <button>Pick Winner</button>
            </section>
            <section className="lottery_history">
                <h2>Lottery History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Lottery Number</th>
                            <th>Winner Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>0x...</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    )
}
