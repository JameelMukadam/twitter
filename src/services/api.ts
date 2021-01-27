import apisauce from 'apisauce'
import { API } from '../config'

const create = (baseURL: string = API) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const getTweets = () => api.get('/tweets')
  
  return {
    getTweets
  }
}

export default create;
