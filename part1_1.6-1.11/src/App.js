import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const positivePercent = all == 0 ? 0 : good / all + " %"
  const avg = all == 0 ? 0 : (good - bad) / all
  const statistics = {
    good: {
      value: good,
      increaseValue: () => setGood(good + 1)
    }
    ,
    neutral: {
      value: neutral,
      increaseValue: () => setNeutral(neutral + 1)
    },
    bad: {
      value: bad,
      increaseValue: () => setBad(bad + 1)
    },
    all: all,
    avg: avg,
    positivePercent: positivePercent
  }
  console.log(statistics)
  return (
    <div>
      <Header title="Give feedback" />
      <FeedbackButtons statistics={statistics} />
      <FeedbackStatistics statistics={statistics} />
    </div>
  )
}
const Header = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}
const FeedbackButtons = ({ statistics }) => {
  return (
    <div>
      <Button name="good" onClick={() => statistics.good.increaseValue()} />
      <Button name="neutral" onClick={() => statistics.neutral.increaseValue()} />
      <Button name="bad" onClick={() => statistics.bad.increaseValue()} />
    </div>
  )
}
const Button = ({ name, onClick }) => {
  return (
    <button onClick={onClick}>{name}</button>
  )
}
const FeedbackStatistics = ({ statistics }) => {
  const feedbackGiven = statistics.all != 0
  return (
    <div>
      <Header title="Statistics" />
      {feedbackGiven ? (
        <div>
          <FeedbackStatisticTable statistics={statistics} />
        </div>) : (
        <p>No feedback given</p>
      )
      }
    </div>
  )
}
const FeedbackStatisticTable = ({ statistics }) => {
  return (
    <table>
      <tbody>
        <FeedbackOutputRow feedbackOutputName="good" FeedbackValue={statistics.good.value} />
        <FeedbackOutputRow feedbackOutputName="neutral" FeedbackValue={statistics.neutral.value} />
        <FeedbackOutputRow feedbackOutputName="bad" FeedbackValue={statistics.bad.value} />
        <FeedbackOutputRow feedbackOutputName="all" FeedbackValue={statistics.all} />
        <FeedbackOutputRow feedbackOutputName="average" FeedbackValue={statistics.avg} />
        <FeedbackOutputRow feedbackOutputName="positive" FeedbackValue={statistics.positivePercent} />
      </tbody>
    </table>
  )
}
const FeedbackOutputRow = ({ feedbackOutputName, FeedbackValue }) => {
  return (
    <tr>
      <td>{feedbackOutputName}</td><td>{FeedbackValue}</td>
    </tr>
  )
}

export default App