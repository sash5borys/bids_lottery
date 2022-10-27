import React, { useEffect, useContext } from 'react'
import { StateContext } from '../data/StateProvider'
import './Modal.css'

export const Modal = () => {
    const { state, dispatch } = useContext(StateContext)

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: 'CLOSE_MODAL' })
        }, 2000)
    }, [state.isModalOpen])

    return (
        <div className="modal">
            <span>{state.modalContent}</span>
        </div>
    )
}
