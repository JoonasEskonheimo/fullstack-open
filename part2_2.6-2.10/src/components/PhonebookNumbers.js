import Header from "./Header"
import PhonebookTable from "./PhonebookTable"

const PhonebookNumbers = ({ numbers }) => {
    return (
        <div>
            <Header text='Numbers' />
            <PhonebookTable numbers={numbers} />
        </div>
    )
}

export default PhonebookNumbers