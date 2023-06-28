const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
     <Header name={course.name}/>
     <Content parts={course.parts}/>
     <Total parts={course.parts}/>
    </div>
  )
}
const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}
const Content = ({parts}) => {
  return (
    <div>
     <Part name={parts[0].name} exercise={parts[0].exercises}/>
     <Part name={parts[1].name} exercise={parts[1].exercises}/>
     <Part name={parts[2].name} exercise={parts[2].exercises}/>
    </div>
  )
}
const Part = (part) => {
  return (
  <p>
    {part.name} {part.exercise}
  </p>
  )
}
const Total = ({parts}) => { 
  let totalAmount = 0
  parts.forEach(element => {
    totalAmount += element.exercises
  })

  return(
<p>Number of exercises {totalAmount}</p>
  )
}

export default App