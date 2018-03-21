// import Config from '../../config'
import { fetch } from '../../utils'
// import UserModel from './usermodel'
const HOSTNAME = process.env.API_HOSTNAME

export const loginUser = (credentials) => {
  return fetch(`http://localhost:3030/login`, {
    method: 'POST',
     /*mode: 'no-cors',*/
     body:JSON.stringify(credentials),
    headers: {
    'Content-Type': 'application/json'
    },
    
  })
  .then((res) => {
    return res.json()
   })
  .then((payload) => {
    return payload
  })
  .catch((error) => {
    throw error
  })
}

export const singupUser = (credentials) => {
  return fetch(`http://localhost:3030/singup`, {
   /* mode: 'no-cors',*/
    method: 'POST',
    headers: ({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(credentials)
  })
  .then((res) => {
    return res.json()
   })
  .catch((error) => {
    throw error
  })
}