import LikeButton from "./LikeButton"
import DeleteButton from "./DeleteButton"
const AdditionalInformation = ({ blog, blogHandler }) => {

    return (<div className="blog-additional-information">
        <br />
        url: {blog.url}
        <br />
        likes: {blog.likes} <LikeButton blog={blog} addLikesHandler={blogHandler.addLikesHandler} />
        <DeleteButton deleteBlogHandler={blogHandler.deleteBlogHandler} id={blog.id} />
    </div>
    )
}
export default AdditionalInformation