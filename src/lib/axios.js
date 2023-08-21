import http from 'axios'

const url = 'https://backend-api-fezv3fzgpa-uc.a.run.app/api/v1'
const token = localStorage.getItem('token')

const axios = http.create({
  baseURL: url,
  headers: {
    Authorization: 'Bearer ' + token,
  },
})

export default axios
