import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import anecdoteServer from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteServer.createNew(content)
        dispatch(createAnecdote(newAnecdote))
        dispatch(notify(`You created '${content}'`))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm