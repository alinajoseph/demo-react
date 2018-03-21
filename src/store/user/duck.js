import Rx from 'rxjs/Rx'
import { Record } from 'immutable'
import { combineEpics } from 'redux-observable'
import { assign } from 'lodash'

import { INIT, LOADING, SUCCESS, ERROR } from '../../constants/phase'

import * as api from './api'

/***********************************
 * Action Types
 ***********/

export const LOGIN_USER = 'user/LOGIN'
export const LOGIN_USER_SUCCESS = 'user/LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'user/LOGIN_USER_ERROR'

export const SINGUP_USER = 'shirali/user/SINGUP'
export const SINGUP_USER_SUCCESS = 'shirali/user/SINGUP_USER_SUCCESS'
export const SINGUP_USER_ERROR = 'shirali/user/SINGUP_USER_ERROR'

export const SIGNOUT = 'shirali/user/SIGNOUT'

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
    case LOGIN_USER: {
      return state
        .set('phase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case LOGIN_USER_SUCCESS: {
      const { payload } = action
      if(payload.token){localStorage.setItem('user', payload.token)}else{localStorage.clear()};
      return state
        .set('phase', payload.success)
       .set('user', payload)
        .set('error', payload.message)
        .set('isSubmitting', false)
    }

    case LOGIN_USER_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error)
        .set('phase', false)
        .set('isSubmitting', false)
    }

    case SINGUP_USER: {
      return state
        .set('phase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case SINGUP_USER_SUCCESS: {
      const { payload } = action
      if(payload.token){localStorage.setItem('user', payload.token)}
        else {localStorage.clear()};
      return state
        .set('phase', payload.success)
        .set('user', payload)
        .set('error', payload.message)
        .set('isSubmitting', false)
    }

    case SINGUP_USER_ERROR: {
      const { payload } = action
      return state
        .set('error', payload.error)
        .set('phase', false)
        .set('isSubmitting', false)
    }

    case SIGNOUT: {
      console.log("hello");
      localStorage.clear('user');
      return state = new InitialState();
    }    

    default: {
      return state
    }
  }
}


/***********************************
 * Action Creators
 ***********/

export const loginUser = (credentials) => {
  return {
    type: LOGIN_USER,
    payload: credentials
  }
}

export const singupUser = (credentials) => {
  return {
    type: SINGUP_USER,
    payload: credentials
  }
}


export const singout = () => ({
  type: SIGNOUT
})



/***********************************
 * Epics
 ***********************************/
const loginUserEpic = (action$) =>
  action$
  .ofType(LOGIN_USER)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.loginUser(action.payload))
    .flatMap((payload) => ([{
      type: LOGIN_USER_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: LOGIN_USER_ERROR,
      payload: { error }
    }))    
  })

const singupUserEpic = (action$) =>
  action$
  .ofType(SINGUP_USER)
  .mergeMap((action) => {
    return Rx.Observable.fromPromise(api.singupUser(action.payload))
    .flatMap((payload) => ([{
      type: SINGUP_USER_SUCCESS,
      payload
    }]))
    .catch((error) => Rx.Observable.of({
      type: SINGUP_USER_ERROR,
      payload: { error }
    }))    
  })

export const userEpic = combineEpics(
  loginUserEpic,
  singupUserEpic,

)
