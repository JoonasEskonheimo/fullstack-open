const NumberRow = ({ phoneNumber }) => {
    return (
        <tr>
            <td>
                {phoneNumber.name} {phoneNumber.number}
            </td>
        </tr>
    )
}
export default NumberRow