import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const pointsArr = [0, 0, 0, 0, 0, 0, 0, 0]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(pointsArr)

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }
  const addPoints = (index) => {
    const updatedPoints = [...points]
    updatedPoints[index] += 1;
    setPoints(updatedPoints);
  }

  const getIndexOfLargestValue = () => {
    let indexOfLargestValue = 0
    let largestValue = 0
    for (let i = 0; i < points.length; i++) {
      if (points[i] > largestValue) {
        indexOfLargestValue = i
        largestValue = points[i]
      }
    }
    return indexOfLargestValue
  }

  const indexOfMostPoints = getIndexOfLargestValue()
  return (
    <div>
      <Header title="Anectdote of the day" />
      <div>
        {anecdotes[selected]} Has {points[selected]} points.
      </div>
      <div>
        <Button setState={() => addPoints(selected)} value={'vote'} />
        <Button setState={() => setSelected(getRandomInt(anecdotes.length))} value={'next anecdote'} />
      </div>
      <div>
        <Header title="Anectdote with most points" />
        {anecdotes[indexOfMostPoints]} Has {points[indexOfMostPoints]} points.
      </div>
    </div>
  )
}
const Button = ({ setState, value }) => {
  return (
    <button onClick={setState}>{value}</button>
  )
}

const Header = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}

export default App