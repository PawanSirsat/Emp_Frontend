import axios from 'axios'

const api = axios.create({
  // baseURL: 'https://empbackend-production.up.railway.app/api/v1',
  baseURL: 'http://localhost:8081/api/v1',
})

export default api
