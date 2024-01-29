const LikeButton = ({ blog, addLikesHandler }) => {

    const handleClick = () => {
        addLikesHandler(blog.id)
    }
    return (
        <button onClick={handleClick}>like</button>
    )
}

export default LikeButton