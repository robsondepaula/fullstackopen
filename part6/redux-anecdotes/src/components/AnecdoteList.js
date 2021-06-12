import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => {
        if (filter) {
            return state.anecdotes.filter(anecdote => anecdote.content.includes(filter))
        } else {
            return state.anecdotes
        }
    })
    const dispatch = useDispatch()

    anecdotes.sort((a, b) => (a.votes < b.votes) ? 1 : -1)

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => {
                            dispatch(vote(anecdote.id))
                            dispatch(notify(`You voted for '${anecdote.content}'`))
                        }}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList