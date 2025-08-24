import {
    getSettingsReducer
} from "./reducers/settingsReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const reducer = combineReducers({
    settings: getSettingsReducer,

    userLogin: userLoginReducer,
    // userRegister: userRegisterReducer
});


const store = configureStore({
    reducer: reducer
})

export default store;