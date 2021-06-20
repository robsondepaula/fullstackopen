import {
    useParams
} from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(n => n.id === id)
    return (
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <div>has {anecdote.votes} votes</div>
            <br />
            <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
            <br />
        </div>
    )
}

export default Anecdote