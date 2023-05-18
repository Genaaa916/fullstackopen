import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = good / all * 100
  return (
    <div>
      <h2>statistics</h2>
      <Display name = 'good' value={good}/>
      <Display name = 'neutral' value={neutral}/>
      <Display name = 'bad' value={bad}/>
      <Display name = 'all' value={all}/>
      <Display name = 'average' value={average}/>
      <Display name = 'positive' value={positive}/>
    </div>
  )}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({value, name}) => !isNaN(value) && <div>{name}: {value}</div>

const Feedback = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = newValue => {
  setGood(newValue)
  }
  const increaseNeutral = newValue => {
  setNeutral(newValue)
  }
  const increaseBad = newValue => {
  setBad(newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => increaseGood(good +1)} text="good" />
      <Button handleClick={() => increaseNeutral(neutral +1)} text="neutral" />
      <Button handleClick={() => increaseBad(bad +1)} text="bad" />
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}
const App = () => {
 
  return (
    <div>
      <Feedback />
    </div>
  )
}

export default App