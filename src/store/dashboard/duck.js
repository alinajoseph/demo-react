import Rx from 'rxjs/Rx'
import { Record } from 'immutable'
import { combineEpics } from 'redux-observable'
import { assign } from 'lodash'

import { INIT, LOADING, SUCCESS, ERROR } from '../../constants/phase'

import * as api from './api'

/***********************************
 * Action Types
 ***********/

export const POSTFETCH = 'app/user/POSTFETCH'
export const POST_FETCH_SUCCESS = 'app/user/POST_FETCH_SUCCESS'
export const POST_FETCH_ERROR = 'app/user/POST_FETCH_ERROR'

export const POST = 'app/user/POST'
export const POST_SUCCESS = 'app/user/POST_SUCCESS'
export const POST_ERROR = 'app/user/POST_ERROR'

export const POSTDELETE = 'app/user/POSTDELETE'
export const POST_DELETE_SUCCESS = 'app/user/POST_DELETE_SUCCESS'
export const POST_DELETE_ERROR = 'app/user/POST_DELETE_ERROR'

export const POSTEDIT = 'app/user/POSTEDIT'
export const POST_EDIT_SUCCESS = 'app/user/POST_EDIT_SUCCESS'
export const POST_EDIT_ERROR = 'app/user/POST_EDIT_ERROR'

export const SIGN_OUT = 'app/user/SIGN_OUT'

/***********************************
 * Initial State
 ***********/

// Unlike other ducks we are taking a class style approach
// for creating the InitialState. This is becuase we need to fetch the
// locally stored token in the constructor when it is created
const InitialStateInterface = {
  token: null,  // We need this here to tell InitialState that there is a token key,
                // but it will be reset below to what is in localStorage, unless a value
                // is passed in when the object is instanciated
  phase: INIT,
  patchPhase: INIT,
  adminPhase: INIT,
  resetPhase: INIT,
  fetchPhase: INIT,
  resetEmailPhase: INIT,
  resetPasswordPhase: INIT,
  updatePhase: INIT,
  user: null,
  post: null,
  users: [],
  userdata:[],
  dataPhase: INIT,
  error: null,
  isSubmitting: false,
  edit: null,
  settings: null,
  message:'',
  forgotPasswordError: null,
  resetPasswordError: null,
}
class InitialState extends Record(InitialStateInterface) {
   constructor(desiredValues) {
    // When we construct InitialState, we automatically update it's default value
    // for token to be what is stored in localStorage
    // const token = localStorage.getItem(Config.LocalStorageKeys.Authorization)
    super(assign(desiredValues))
   }
}

/***********************************
 * Reducer
 ***********/

// eslint-disable-next-line complexity, max-statements
// export default function (state = new InitialState(), action = {}) {
export default function (state = new InitialState(), action = {}) {
  switch (action.type) {
    case POSTFETCH: {
      return state
        .set('phase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case POST_FETCH_SUCCESS: {
      const { payload } = action
      return state
        .set('phase', payload.success)
        .set('post', payload.post)
        .set('error', payload.message)
        .set('isSubmitting', false)
    }

    case POST_FETCH_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error)
        .set('phase', false)
        .set('isSubmitting', false)
    }

    case POST: {
      return state
        .set('phase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case POST_SUCCESS: {
      const { payload } = action
      return state
        .set('phase', payload.success)
       .set('post', payload.post)
        .set('error', payload.message)
        .set('isSubmitting', false)
    }

    case POST_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error)
        .set('phase', false)
        .set('isSubmitting', false)
    }

    case POSTDELETE: {
      return state
        .set('phase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case POST_DELETE_SUCCESS: {
      const { payload } = action
      return state
        .set('phase', payload.success)
        .set('post', payload.post)
        .set('error', payload.message)
        .set('isSubmitting', false)
    }

    case POST_DELETE_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error)
        .set('phase', false)
        .set('isSubmitting', false)
    }
       
    case POSTEDIT: {
      return state
        .set('phase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case POST_EDIT_SUCCESS: {
      const { payload } = action
      return state
        .set('phase', payload.success)
        .set('post', payload.post)
        .set('error', payload.message)
        .set('isSubmitting', false)
    }

    case POST_EDIT_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error)
        .set('phase', false)
        .set('isSubmitting', false)
    }

    case SIGN_OUT: {
      localStorage.clear()
    }
        
    default: {
      return state
    }
  }
}


/***********************************
 * Action Creators
 ***********/

// export const dashboard = (credentials) => {
//   return {
//     type: DASHBOARD,
//     payload: credentials
//   }
// }

export const post = (credentials) => {
  return {
    type: POST,
    payload: credentials
  }
}

export const postFetch = (credentials) => {
  return {
    type: POSTFETCH,
    payload: credentials
  }
}

export const postDelete = (credentials) => {
  return {
    type: POSTDELETE,
    payload: credentials
  }
}

export const postEdit = (credentials) => {
  return {
    type: POSTEDIT,
    payload: credentials
  }
}

export const singout = () => ({
  type: SIGN_OUT
})


/***********************************
 * Epics
 ***********************************/


const postPostEpic = (action$) =>
  action$
  .ofType(POST)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.post(action.payload))
    .flatMap((payload) => ([{
      type: POST_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: POST_ERROR,
      payload: { error }
    }))    
  })

  const postFetchEpic = (action$) =>
  action$
  .ofType(POSTFETCH)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.postFetch(action.payload))
    .flatMap((payload) => ([{
      type: POST_FETCH_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: POST_FETCH_ERROR,
      payload: { error }
    }))    
  })

  const postDeleteEpic = (action$) =>
  action$
  .ofType(POSTDELETE)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.postDelete(action.payload))
    .flatMap((payload) => ([{
      type: POST_DELETE_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: POST_DELETE_ERROR,
      payload: { error }
    }))    
  })

  const postEditEpic = (action$) =>
  action$
  .ofType(POSTEDIT)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.postEdit(action.payload))
    .flatMap((payload) => ([{
      type: POST_EDIT_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: POST_EDIT_ERROR,
      payload: { error }
    }))    
  })

export const dashboardsEpic = combineEpics(
  postPostEpic,
  postFetchEpic,
  postDeleteEpic,
  postEditEpic,


)
