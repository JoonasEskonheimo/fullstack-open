import { useState } from 'react'
import HideButton from './HideButton'
import ViewButton from './ViewButton'
import AdditionalInformation from './AdditionalInformation'


const Blog = ({ blog, blogHandler }) => {
  const [showAll, setShowAllInformation] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div>{blog.title} {blog.author}</div>
      {showAll ? <HideButton setShowAllInformation={setShowAllInformation} /> : <ViewButton setShowAllInformation={setShowAllInformation} />}
      {showAll && <AdditionalInformation blog={blog} blogHandler={blogHandler} />}
    </div>
  )
}

export default Blog