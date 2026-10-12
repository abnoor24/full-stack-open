import axios from 'axios'

const baseUrl = '/api/login'

const userLogin = async (user) => {
  try{
    const response = await axios.post(baseUrl,user) // if user is {username,password}
    return response.data
  }catch(e){
    throw new Error(e.response.data.error)
  }
}

export default { userLogin }