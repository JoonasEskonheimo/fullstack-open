import Header from "./Header"

const Search = ({ onChangeHandler }) => {
    return (
        <div>
            <Header text='Search' />
            <input onChange={onChangeHandler} />
        </div>
    )
}
export default Search