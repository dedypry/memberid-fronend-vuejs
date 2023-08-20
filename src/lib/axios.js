import http from 'axios'

const url = 'http://127.0.0.1:3001/api/v1'
const token = localStorage.getItem('token')

const axios = http.create({
  baseURL: url,
  headers: {
    Authorization: 'Bearer ' + token,
  },
})

export default axios
