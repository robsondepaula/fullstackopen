import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.votes - b1.votes

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT':
            return action.data.sort(byLikes)
        case 'LIKE': {
            const liked = action.data
            return state.map(a => a.id === liked.id ? liked : a).sort(byLikes)
        }
        case 'REMOVE': {
            return state.filter((item) => item.id !== action.data).sort(byLikes)
        }
        case 'CREATE':
            return [...state, action.data]
        default:
            return state
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        const data = await blogService.create(content)
        dispatch({
            type: 'CREATE',
            data
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const data = await blogService.getAll()
        dispatch({
            type: 'INIT',
            data
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const toLike = { ...blog, likes: blog.likes + 1 }
        const data = await blogService.update(toLike)
        dispatch({
            type: 'LIKE',
            data
        })
    }
}

export const removeBlog = (blogId) => {
    return async dispatch => {
        await blogService.remove(blogId)
        dispatch({
            type: 'REMOVE',
            data: blogId
        })
    }
}

export default reducer