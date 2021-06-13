
import anecdoteServer from '../services/anecdotes'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote
      )
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id
    }
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteServer.createNew(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServer.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes,
    })
  }
}

export default reducer