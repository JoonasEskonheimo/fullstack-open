const Total = ({ parts }) => {
    const exerciseAmount = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p>total of {exerciseAmount} exercises</p>
    )
}
export default Total