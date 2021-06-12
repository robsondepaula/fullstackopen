const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'NOTIFY':
            state = action.message
            break
        case 'CLEAR':
            state = ''
            break
        default:
    }
    return state
}

export const notify = message => {
    return {
        type: 'NOTIFY',
        message,
    }
}


export const clearNotification = () => {
    return {
        type: 'CLEAR',
    }
}

export default notificationReducer