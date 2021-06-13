
import anecdoteServer from '../services/anecdotes'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW':
      return [...state, action.data]
    case 'VOTE':
      const updatedAnecdote = action.data
      const toUpdate = state.find(n => n.id === updatedAnecdote.id)
      const updated = {
        ...toUpdate,
        votes: updatedAnecdote.votes
      }
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updated
      )
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const vote = (id) => {
  return async dispatch => {
    let anecdoteToVote = await anecdoteServer.get(id)
    anecdoteToVote.votes++
    const votedAnecdote = await anecdoteServer.update(anecdoteToVote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote,
    })
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