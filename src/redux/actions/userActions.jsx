import { toast } from "react-toastify";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
} from "../constants/userConstants";
import axios from "axios";
import { api } from "../../api";

export const login = (email, password, setUserVerified) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });

        const url = "https://ataseng.com/api/auth/login.php";
        const body = {
            email,
            password
        }

        const data = await api.post_with_credentials(url, body);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        // localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        if(error.response.data.error === "inactive_user"){
            setUserVerified(false);
        }
        toast.error(error.response.data.message);
        dispatch({
            type : USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        });
    }
};

export const logout = () => async (dispatch) => {

    const config = {
        headers: {
            "Content-type" : "application/json"
        },
        credentials: "include"
    };

    fetch(
        "https://ataseng.com/api/auth/logout.php",
        config
    );

    localStorage.removeItem("userInfo");
    dispatch({
        type: USER_LOGOUT
    });
    // dispatch({
    //     type: USER_DETAILS_RESET
    // });
    // dispatch({
    //     type: USER_LIST_RESET
    // });
};

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type" : "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(
            `/api/users/${id}/`,
            config
        );

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });

        
    } catch (error) {
        dispatch({
            type : USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        });
    }
};


export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type" : "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(
            `/api/users/profile/update/`,
            user,
            config
        );

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem("userInfo", JSON.stringify(data));

        
    } catch (error) {
        dispatch({
            type : USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        });
    }
};


export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type" : "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(
            `/api/users/`,
            config
        );

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type : USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        });
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type" : "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.delete(
            `/api/users/delete/${id}/`,
            config
        );

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type : USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        });
    }
};

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-type" : "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(
            `/api/users/update/${user._id}/`,
            user,
            config
        );

        dispatch({
            type: USER_UPDATE_SUCCESS,
        });

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type : USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        });
    }
};