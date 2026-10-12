import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const addToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const removeToken = () => {
  token = null
}

const getAll = async () => {
  try{
    const response = await axios.get(baseUrl)
    return response.data
  }catch(e){
    throw new Error(e.response.data.error)
  }
}

const createBlog = async (newBlog) => {
  try{
    const config = {
      headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  }catch(e){
    throw new Error(e.response.data.error)
  }
}

const deleteBlog = async id => {
  try{
    const config = {
      headers: { Authorization: token }
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  }catch(e){
    throw new Error(e.response.data.error)
  }
}

const addLikes = async (id) => {
  try{
    const config = {
      headers: { Authorization: token }
    }
    const response = await axios.put(`${baseUrl}/likes/${id}`, id ,config)
    return response.data
  }catch(e){
    throw new Error(e.response.data.error)

  }
}



export { getAll, createBlog, deleteBlog, addToken, removeToken, addLikes }