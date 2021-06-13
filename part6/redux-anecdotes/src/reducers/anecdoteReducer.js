
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

export const createAnecdote = (data) => {
  return {
    type: 'NEW',
    data,
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes,
  }
}

export default reducer