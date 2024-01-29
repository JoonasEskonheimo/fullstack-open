const HideButton = ({ setShowAllInformation }) => {

    const handleClick = () => {
        setShowAllInformation(false)
    }

    return (<button onClick={handleClick}>hide</button>)
}
export default HideButton