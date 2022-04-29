import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'

import { rootReducer } from './root-reducer'

// redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whiteliste: ['cart']
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

// whenever you dispatch an action, before the action 
// hits the reducers it hits the middleware first 
// the .filter(Boolean) filters out of the array everything that is false
const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(Boolean)
const composedEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares))

// 2nd param is undefined because if you wanna use the
// logger, it must be provided as the 3rd parameter
export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)