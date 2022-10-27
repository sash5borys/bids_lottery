export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_MODAL': {
            console.log(action.payload)
            return {
                ...state,
                isModalOpen: true,
                modalContent: action.payload,
            }
        }
        case 'CLOSE_MODAL': {
            return {
                ...state,
                isModalOpen: false,
            }
        }
        case 'SET_PROVIDER': {
            return {
                ...state,
                provider: action.payload,
            }
        }
        case 'SET_CONTRACT': {
            return {
                ...state,
                contract: action.payload,
            }
        }
        case 'SET_TRANACTION': {
            return {
                ...state,
                transactions: [...state.transactions, action.payload],
            }
        }
        case 'SET_ACCOUNT': {
            return {
                ...state,
                account: action.payload,
            }
        }
        case 'SET_LOTTERY': {
            return {
                ...state,
                currLottery: action.payload,
            }
        }
        case 'SET_HISTORY': {
            return {
                ...state,
                lotteryHistory: action.payload,
            }
        }
        default:
            throw new Error('Incorrect action')
    }
}
