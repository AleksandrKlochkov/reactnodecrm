//import { browserHistory } from 'react-router'
import { createBrowserHistory } from 'history'

import {
    REDIRECT
} from '../store/actions/actionTypes'

const browserHistory = createBrowserHistory();

export const redirect = store => next => action => { //eslint-disable-line no-unused-vars
  if (action.type === REDIRECT) {
    browserHistory[action.payload.method](action.payload.nextUrl)
  }

  return next(action)
}