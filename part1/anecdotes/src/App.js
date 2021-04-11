import React, { useState } from 'react'

const Button = ({ title, handleClick }) => {
  return <button onClick={handleClick}>{title}</button>;
}

const randomize = (max) => {
  return Math.floor(Math.random() * max);
}

const findMostVotedIndex = (array) => {
  let mostVoted = array[0];
  let indexOfMostVoted = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i] > mostVoted) {
      mostVoted = array[i];
      indexOfMostVoted = i;
    }
  }
  return indexOfMostVoted;
}

const findMostVotedVotes = (array) => {
  let mostVoted = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > mostVoted) {
      mostVoted = array[i];
    }
  }
  return mostVoted;
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <p>
        Has {votes[selected]} votes.
      </p>
      <Button title="Vote" handleClick={() => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
      }} />
      <Button title="Next anecdote" handleClick={() => setSelected(randomize(anecdotes.length))} />
      <h1>Most voted anecdote</h1>
      <p>
        {anecdotes[findMostVotedIndex(votes)]}
      </p>
      <p>
        Has {findMostVotedVotes(votes)} votes.
      </p>
    </div>
  )
}

export default App