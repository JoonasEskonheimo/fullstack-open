const ViewButton = ({ setShowAllInformation }) => {

    const handleClick = () => {
        setShowAllInformation(true)
    }

    return (<button id="view-additional-information" onClick={handleClick}>view</button>)
}
export default ViewButton