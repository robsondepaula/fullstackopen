import React, { useState } from 'react'

const Header = ({ title }) => {
  return (
    <h1>{title}</h1>
  );
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  );
}

const Statistics = ({ title, good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all !== 0) {
    return (
      <div>
        <h1>{title}</h1>
        <table>
          <thead>
            <tr>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            <Statistic text="Good" value={good} />
            <Statistic text="Neutral" value={neutral} />
            <Statistic text="Bad" value={bad} />
            <Statistic text="Total" value={all} />
            <Statistic text="Average" value={(good - bad) / all} />
            <Statistic text="Positive" value={((good / all) * 100) + "%"} />
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{title}</h1>
        <p>No feedback given.</p>
      </div>
    );
  }
}

const Button = ({ title, handleClick }) => {
  return <button onClick={handleClick}>{title}</button>;
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title="Please give your feedback:" />
      <Button title="Good" handleClick={() => setGood(good + 1)} />
      <Button title="Neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button title="Bad" handleClick={() => setBad(bad + 1)} />
      <Statistics title="Statistics:" good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

