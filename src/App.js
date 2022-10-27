import React, { useEffect, useContext } from 'react'
import { StateContext } from './data/StateProvider'
import './App.css'
import { Modal } from './components/Modal'
import { WalletCard } from './components/WalletCard'
import { GameBoard } from './components/GameBoard'
import Web3 from 'web3'
import { LotteryAbi, LotteryAddress } from './utils/lottery'

function App() {
    const { state, dispatch } = useContext(StateContext)

    useEffect(() => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            const web3 = new Web3(window.ethereum)
            const contract = new web3.eth.Contract(LotteryAbi, LotteryAddress)

            dispatch({ type: 'SET_PROVIDER', payload: web3 })
            dispatch({ type: 'SET_CONTRACT', payload: contract })
        } else {
            dispatch({
                type: 'SET_MODAL',
                payload: 'Cannot find any providers. Please install MetaMask!',
            })
        }
    }, [])

    const chainChangedHandler = () => {
        window.location.reload()
    }
    window.ethereum.on('chainChanged', chainChangedHandler)

    return (
        <div className="app">
            <header className="row">
                <h1>Bids Lottery</h1>
                {state.isModalOpen && <Modal />}
            </header>
            <main>
                <WalletCard />
                {state.account.address && <GameBoard />}
            </main>
        </div>
    )
}

export default App
