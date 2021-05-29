import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: {
      Authorization: token
    },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updateObject => {
  const config = {
    headers: {
      Authorization: token
    },
  }

  const reqUrl = `${baseUrl}/${updateObject.id}`
  const response = await axios.put(reqUrl, updateObject, config)
  return response.data
}

const Blogs = {
  getAll,
  create,
  setToken,
  update
}

export default Blogs