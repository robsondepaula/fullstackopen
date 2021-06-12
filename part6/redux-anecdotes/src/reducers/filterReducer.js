const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'UPDATE':
            state = action.filter
            break
        default:
    }
    return state
}

export const update = filter => {
    return {
        type: 'UPDATE',
        filter,
    }
}

export default filterReducer