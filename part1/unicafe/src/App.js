import React, { useState } from 'react'

const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  );
}

const Statistics = ({title, good, neutral, bad}) => {
  const all = good + neutral + bad;
  return (
    <div>
      <h1>{title}</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {all}</p>
      <p>Average: {(good - bad)/all}</p>
      <p>Positive: {(good/all) * 100} %</p>
    </div>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title="Please give your feedback:"/>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <Statistics title="Statistics:" good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App