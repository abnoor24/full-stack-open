import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null
let config = null

const addToken = (newToken) => {
  token = `Bearer ${newToken}`
  config = {
    headers: { Authorization: token }
  }
}

const removeToken = () => {
  token = null
  config = null
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
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  }catch(e){
    throw new Error(e.response.data.error)
  }
}

const deleteBlog = async id => {
  try{
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  }catch(e){
    throw new Error(e.response.data.error)
  }
}

const addLikes = async (id) => {
  try{
    const response = await axios.put(`${baseUrl}/likes/${id}`, id ,config)
    return response.data
  }catch(e){
    throw new Error(e.response.data.error)
  }
}



export { getAll, createBlog, deleteBlog, addToken, removeToken, addLikes }