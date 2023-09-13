import NumberRow from "./numberRow"

const PhonebookTable = ({ handlers, numbers }) => {
    return (
        <table>
            <tbody>
                {numbers.map(number => <NumberRow key={number.id} phoneNumber={number} deleteHandler={handlers.deleteHandler} />)}
            </tbody>
        </table>
    )
}

export default PhonebookTable