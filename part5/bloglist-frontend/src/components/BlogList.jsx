import Blog from "./Blog"

const BlogList = ({ blogs, setBlogs, notify }) => {
  const sortBlogbyLikes = blogs.toSorted((a,b) => b.likes-a.likes)
  const blogList = sortBlogbyLikes.map(blog =>
      <Blog 
        key={blog.id} 
        blog={blog} 
        setBlogs = {setBlogs} 
        notify={notify}/>
    )
  return <>
    <div className="bloglist">
    {blogList}
    </div>
    </>
}

export default BlogList