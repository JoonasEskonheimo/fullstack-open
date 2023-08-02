import Header from "./header"
import PhonebookTable from "./phonebookTable"

const PhonebookNumbers = ({ handlers, numbers }) => {
    return (
        <div>
            <Header text='Numbers' />
            <PhonebookTable handlers={handlers} numbers={numbers} />
        </div>
    )
}

export default PhonebookNumbers