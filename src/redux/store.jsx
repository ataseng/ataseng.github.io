import {
    getSettingsReducer
} from "./reducers/settingsReducers";
import { userLoginReducer } from "./reducers/userReducers";
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const reducer = combineReducers({
    settings: getSettingsReducer,

    userLogin: userLoginReducer,
});


const store = configureStore({
    reducer: reducer
})

export default store;