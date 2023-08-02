import Header from "./Header"

const PersonForm = ({ handlers, personFormState }) => {
    return (
        <div>
            <Header text='Add person' />
            <form onSubmit={handlers.submitHandler}>
                <div>
                    name: <input onChange={handlers.nameChangeHandler} value={personFormState.newName} />
                    number: <input onChange={handlers.numberChangeHandler} value={personFormState.newNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}
export default PersonForm