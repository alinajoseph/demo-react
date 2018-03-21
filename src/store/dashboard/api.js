// import Config from '../../config'
import { fetch } from '../../utils'
// import UserModel from './usermodel'
const HOSTNAME = process.env.API_HOSTNAME

export const post = (credentials) => {
  return fetch(`http://localhost:3030/post/add`, {
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

export const postFetch = (credentials) => {
  return fetch(`http://localhost:3030/post/fetch`, {
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

export const postDelete = (credentials) => {
  return fetch(`http://localhost:3030/post/delete`, {
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

export const postEdit = (credentials) => {
  return fetch(`http://localhost:3030/post/edit`, {
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