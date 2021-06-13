const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'NOTIFY':
            state = action.data
            break
        case 'CLEAR':
            state = ''
            break
        default:
    }
    return state
}

export const setNotification = (message, timeout) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFY',
            data: message,
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR',
            })
        }, timeout * 1000)
    }
}

export default notificationReducer