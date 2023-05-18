
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({ course }) => {
  const [parts] = [course.parts]
  console.log(parts)
  
  return (
    <div>
      {parts.map(item => <Part key={item.id} part={item} />)}
      <Total parts={parts} />
    </div>
  )
}

const Total = ({ parts }) => {

  return (
    <p>Total exercises: {parts.reduce((sum, part) => sum + part.exercises, 0)} </p>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

export default Course