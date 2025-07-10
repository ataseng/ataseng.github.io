import {
    getSettingsReducer
} from "./reducers/settingsReducers";
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        settings: getSettingsReducer,
    },
})

export default store;