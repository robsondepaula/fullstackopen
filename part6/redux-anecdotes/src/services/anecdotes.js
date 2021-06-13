import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = {
        content,
        votes: 0
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (object) => {
    const updateUrl = baseUrl + `/${object.id}`
    const response = await axios.put(updateUrl, object)
    return response.data
}


const get = async (id) => {
    const updateUrl = baseUrl + `/${id}`
    const response = await axios.get(updateUrl)
    return response.data
}

const anecdotes = {
    getAll,
    createNew,
    update,
    get
}
export default anecdotes