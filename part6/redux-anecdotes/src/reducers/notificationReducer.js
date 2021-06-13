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

let timeoutID

export const setNotification = (message, timeout) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFY',
            data: message,
        })

        if(timeoutID) {
            clearTimeout(timeoutID)
        }

        timeoutID = setTimeout(() => {
            dispatch({
                type: 'CLEAR',
            })
        }, timeout * 1000)
    }
}

export default notificationReducer