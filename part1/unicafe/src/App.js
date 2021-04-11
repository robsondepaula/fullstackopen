import React, { useState } from 'react'

const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  );
}

const Footer = ({title, good, neutral, bad}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
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
      <Footer title="Statistics:" good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App