const Blog = ({ blog, user, handleLike, deleteBlogOf }) => {
  if (!blog) {
    return null
  }

  const isCreator = user && blog.user && user.id === blog.user.id

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </div>
      <div>
        likes {blog.likes}
        {user && (
          <button onClick={() => handleLike(blog)} style={{ marginLeft: 10 }}>
            like
          </button>
        )}
      </div>
      <div>Added by: {blog.user ? blog.user.name : 'Unknown User'}</div>
      {isCreator && (
        <button onClick={() => deleteBlogOf(blog.id, blog.title)}>
          delete
        </button>
      )}
    </div>
  )
}

export default Blog
