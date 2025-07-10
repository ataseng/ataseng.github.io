import {
    SETTINGS_REQUEST,
    SETTINGS_SUCCESS,
    SETTINGS_FAIL,
} from "../constants/settingsConstants";
import axios from "axios";

export const getSettings = () => async (dispatch) => {
    try {
        dispatch({
            type: SETTINGS_REQUEST
        });

        const { data } = await axios.get(
            `https://ataseng.com/api/get_settings.php`
        );

        dispatch({
            type: SETTINGS_SUCCESS,
            payload: data.content
        });

    } catch (error) {
        dispatch({
            type : SETTINGS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        });
    }
};