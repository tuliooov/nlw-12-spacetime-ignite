import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://169.254.163.152:3333',
})
