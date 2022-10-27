import React, { useContext, useEffect } from 'react'
import { StateContext } from '../data/StateProvider'
import './GameBoard.css'

export const GameBoard = () => {
    const { state, dispatch } = useContext(StateContext)

    const setTransaction = (resultTransaction, resultMessage) => {
        if (resultTransaction.status) {
            dispatch({
                type: 'SET_TRANACTION',
                payload: {
                    id: resultTransaction.transactionIndex,
                    status: resultTransaction.status,
                },
            })
            dispatch({
                type: 'SET_MODAL',
                payload: resultMessage,
            })
        }
    }

    const enterLotteryHandler = async () => {
        const resultTransaction = await state.contract.methods
            .enter()
            .send({
                from: state.account.address,
                value: '0',
                gas: 300000,
                gasPrice: null,
            })
            .catch((err) => {
                dispatch({
                    type: 'SET_MODAL',
                    payload: err.message,
                })
            })
        setTransaction(resultTransaction, 'Now youre take part in this lottery')
    }

    const pickWinnerHandler = async () => {
        const resultTransaction = await state.contract.methods
            .pickWinner()
            .send({
                from: state.account.address,
                value: '0',
                gas: 300000,
                gasPrice: null,
            })
            .catch((err) => {
                dispatch({
                    type: 'SET_MODAL',
                    payload: err.message,
                })
            })

        setTransaction(
            resultTransaction,
            `Congratulations to the winner ${state.lotteryHistory[0].winnerAddress}`,
        )
    }

    const getBalance = async () =>
        await state.contract.methods
            .getBalance()
            .call()
            .catch((err) => {
                dispatch({
                    type: 'SET_MODAL',
                    payload: err.message,
                })
            })

    const getPlayers = async () =>
        await state.contract.methods
            .getPlayers()
            .call()
            .catch((err) => {
                dispatch({
                    type: 'SET_MODAL',
                    payload: err.message,
                })
            })

    const getLotteryId = async () =>
        await state.contract.methods.lotteryId().call()

    const getWinnerInLotteryHistory = async (lotteryId) =>
        await state.contract.methods.getWinnerInLotteryHistory(lotteryId).call()

    const getLotteryHistory = async (lotteryId) => {
        const lotteryHistory = []

        for (let i = lotteryId - 1; i > 0; i--) {
            const newLotteryId = i
            const newWinnerAddress = await getWinnerInLotteryHistory(
                newLotteryId,
            )
            lotteryHistory.push({
                id: newLotteryId,
                winnerAddress: newWinnerAddress,
            })
        }
        return lotteryHistory
    }

    const fetchNewData = async () => {
        const newLotteryId = await getLotteryId()
        const newLotteryBalance = await getBalance()
        const newLotteryPlayers = await getPlayers()
        const lotteryHistory = await getLotteryHistory(newLotteryId)
        dispatch({
            type: 'SET_LOTTERY',
            payload: {
                id: newLotteryId,
                balance: newLotteryBalance,
                players: newLotteryPlayers,
            },
        })
        dispatch({
            type: 'SET_HISTORY',
            payload: lotteryHistory,
        })
        dispatch({
            type: 'SET_MODAL',
            payload: 'Lottery data has been updated',
        })
    }

    useEffect(() => {
        fetchNewData()
    }, [state.transactions])

    return (
        <>
            <section className="game_board">
                <h2>Lottery:{state.currLottery.id}</h2>
                <h3>Ballance:3 ETH</h3>
                <details>
                    <summary>
                        Players({state.currLottery.players.length}):
                    </summary>
                    <ul>
                        {state.currLottery.players.map((player, index) => {
                            return (
                                <li key={index}>
                                    <a
                                        href={`https://testnet.bscscan.com/address/${player}`}
                                    >
                                        {player}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </details>
                <button onClick={enterLotteryHandler}>Enter</button>
                <button onClick={pickWinnerHandler}>Pick Winner</button>
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
                        {state.lotteryHistory.map((lottery, index) => {
                            return (
                                <tr key={index}>
                                    <td>{lottery.id}</td>
                                    <td>
                                        <a
                                            href={`https://testnet.bscscan.com/address/${lottery.winnerAddress}`}
                                        >
                                            {lottery.winnerAddress}
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </>
    )
}
