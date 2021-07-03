import loginService from '../services/login'
import blogService from '../services/blogs'

const STORAGE_KEY = 'loggedBlogAppUser'
const loggedUserJSON = JSON.parse(window.localStorage.getItem(STORAGE_KEY))

const reducer = (state = loggedUserJSON, action) => {
    switch (action.type) {
        case 'LOGIN': {
            const user = action.data
            blogService.setToken(user.token)
            window.localStorage.setItem(
                STORAGE_KEY, JSON.stringify(user)
            )
            state = user
            return state
        }
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export const login = (credentials) => {
    return async dispatch => {
        const data = await loginService.login(credentials)
        dispatch({
            type: 'LOGIN',
            data
        })
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem(STORAGE_KEY)
        window.location.reload()
        dispatch({
            type: 'LOGOUT',
        })
    }
}

export default reducer