import { configureStore, combineReducers } from '@reduxjs/toolkit/react'
import reducers from './reducer'

const rootReducer = combineReducers(reducers)

export const Store = () => configureStore({
        reducer: rootReducer
    })