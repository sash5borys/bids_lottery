import React, { useContext } from 'react'
import { StateContext } from '../data/StateProvider'
import './WalletCard.css'

export const WalletCard = () => {
    const { state, dispatch } = useContext(StateContext)

    const connectWalletHandler = async () => {
        if (state.provider) {
            const accounts = await state.provider.eth.getAccounts()
            dispatch({ type: 'SET_MODAL', payload: 'Wallet Connected' })
            await accountChangedHandler(accounts)
        } else {
            dispatch({
                type: 'SET_MODAL',
                payload: 'Cannot find any providers. Please install MetaMask!',
            })
        }
    }

    const accountChangedHandler = async (accounts) => {
        const newAccountAddress = accounts[0]
        const newAccountBalance = await state.provider.eth.getBalance(
            newAccountAddress,
            'latest',
        )
        dispatch({
            type: 'SET_ACCOUNT',
            payload: {
                address: newAccountAddress,
                ballance: newAccountBalance,
            },
        })
        dispatch({
            type: 'SET_MODAL',
            payload: 'Account data has been updated',
        })
    }

    window.ethereum.on('accountsChanged', accountChangedHandler)

    return (
        <section className="wallet_card">
            <h2> {'Wallet Card'} </h2>
            <button
                onClick={connectWalletHandler}
                disabled={state.account.address}
            >
                Connect
            </button>
            {state.account && state.account.address && (
                <div className="wallet_data">
                    <table>
                        <tbody>
                            <tr>
                                <td>Address:</td>
                                <td>{state.account.address}</td>
                            </tr>
                            <tr>
                                <td>Balance:</td>
                                <td>{state.account.ballance}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    )
}
