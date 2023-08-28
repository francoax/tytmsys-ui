import axios from "axios"

const api = axios.create({
  timeout: 4000,
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  headers : {
    'Content-type' : 'application/json'
  },
  responseType : 'json'
})

export default api