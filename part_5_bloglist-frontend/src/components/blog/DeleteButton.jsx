const DeleteButton = ({ id, deleteBlogHandler }) => {

    const onClick = () => {
        deleteBlogHandler(id)
    }
    return (
        <button onClick={onClick}>remove</button>
    )
}

export default DeleteButton