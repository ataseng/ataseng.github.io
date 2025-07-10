import {
    SETTINGS_REQUEST,
    SETTINGS_SUCCESS,
    SETTINGS_FAIL
} from "../constants/settingsConstants";

export const getSettingsReducer = (state = { settings: [] }, action) => {
    switch (action.type) {
        case SETTINGS_REQUEST:
            return { loading: true, settings:[] };
        
        case SETTINGS_SUCCESS:
            return {loading: false, settings: action.payload };
    
        case SETTINGS_FAIL:
            return {loading: false, error: action.payload };

        default:
            return state;
    }
};