import NumberRow from "./NumberRow"

const PhonebookTable = ({ numbers }) => {
    return (
        <table>
            <tbody>
                {numbers.map(number => <NumberRow key={number.id} phoneNumber={number} />)}
            </tbody>
        </table>
    )
}

export default PhonebookTable