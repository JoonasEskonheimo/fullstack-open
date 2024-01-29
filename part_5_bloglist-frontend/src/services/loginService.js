import axios from 'axios'
const baseUrl = '/api/login'

const login = ({ username, password }) => {
  // const request = axios.post(baseUrl,{username: username, password: password})
  return { username: username, token: '213' }
}

export default { login }