import axios from 'axios'
import { USER_LOGIN_REQ, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT } from "../types"
import { USER_REGISTER_REQ, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE } from "../types"
import { USER_UPDATE_REQ, USER_UPDATE_SUCCESS, USER_UPDATE_FAILURE } from "../types"
import { GET_AUTH_USER_REQ, GET_AUTH_USER_REQ_SUCCESS, GET_AUTH_USER_REQ_FAIL } from "../types"
import cogoToast from 'cogo-toast';
import { APP_URL } from "../../constants/data"


export const getAuthUser = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_AUTH_USER_REQ,
        })

        const token = getState().userLogin.userInfo.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        const { data } = await axios.get(APP_URL + '/api/auth/', config)

        dispatch({
            type: GET_AUTH_USER_REQ_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: GET_AUTH_USER_REQ_FAIL,
            payload: error.response && error.response.data.msg
                ? error.response.data.msg
                : error.message,
        })
    }
}


export const updateUserInfo = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQ,
        })

        const token = getState().userLogin.userInfo.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        const { data } = await axios.put('/api/auth/profile', user, config)

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data,
        })

        dispatch({
            type: GET_AUTH_USER_REQ_SUCCESS,
            payload: data,
        })

        cogoToast.success("Your informations has been successfully updated!", { position: 'top-center', heading: 'Update Profile!' });

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        console.log(error.message)
        let errorMessage = [];
        if (error.response) {
            if (error.response.data.errors) {
                errorMessage = [...error.response.data.errors]
            } else if (error.response.data.message) {
                errorMessage.push(error.response.data.message)
            } else {
                errorMessage.push(error.message)
            }
        } else {
            errorMessage.push(error.message)
        }

        dispatch({
            type: USER_UPDATE_FAILURE,
            payload: errorMessage
        })

        cogoToast.error("Some errors occured. Please try later!", { position: 'top-center', heading: 'Update Profile' });
    }
}


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQ,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            APP_URL + '/api/auth/login',
            { email, password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {

        let errorMessage = [];
        if (error.response) {
            if (error.response.data.errors) {
                errorMessage = [...error.response.data.errors]
            } else if (error.response.data.message) {
                errorMessage.push(error.response.data.message)
            }
        } else {
            errorMessage.push(error.message)
        }

        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: errorMessage
        })

        cogoToast.error("Some errors occured. Please try later!", { position: 'top-center', heading: 'Login' });
    }
}


export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");

    dispatch({
        type: USER_LOGOUT
    })
}


export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQ,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            APP_URL + '/api/auth/register',
            { email, password, name },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        cogoToast.success("Your account has been successfully created!", { position: 'top-center', heading: 'Register!' });

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {

        let errorMessage = [];
        if (error.response) {
            if (error.response.data.errors) {
                errorMessage = [...error.response.data.errors]
            } else if (error.response.data.message) {
                errorMessage.push(error.response.data.message)
            }
        } else {
            errorMessage.push(error.message)
        }

        dispatch({
            type: USER_REGISTER_FAILURE,
            payload: errorMessage
        })

        cogoToast.error("Some errors occured. Please try later!", { position: 'top-center', heading: 'Register' });
    }
}