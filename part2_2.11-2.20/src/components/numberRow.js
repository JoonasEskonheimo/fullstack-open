const NumberRow = ({ deleteHandler, phoneNumber }) => {
    return (
        <tr>
            <td>
                {phoneNumber.name}
            </td>
            <td> {phoneNumber.number}</td>
            <td><button onClick={() => deleteHandler(phoneNumber.id)}>Remove</button></td>
        </tr>
    )
}
export default NumberRow