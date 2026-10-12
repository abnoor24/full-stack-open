export default function BlogForm({createBlog}){
  return <form className="form" action={createBlog}>
    <h4>Create new:</h4>

    <label>
      <span>Title:</span> 
      <input 
      type="text"
      name="title"
      />
    </label>
 
    <label> 
      <span>Author:</span> 
      <input 
      type="text"
      name="author"
      />
    </label>

    <label>
      <span>URL:</span>
      <input 
      type="text"
      name="url"
      />
    </label>
    
    <button>Create</button>
  </form>
}