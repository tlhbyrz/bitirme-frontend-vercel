import {
    GET_POST_BY_ID,
    LIKE_POST,
    UNLIKE_POST,
    SEND_COMMENT_POST,
    DELETE_COMMENT_POST,
    POST_ACTIONS_LOADING,
    POST_ACTIONS_FAILURE
} from "../types"
import axios from "axios"

export const getPostById = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: POST_ACTIONS_LOADING,
        })

        const token = getState().userLogin.userInfo.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        const { data } = await axios.get(`/api/post/${id}`, config)

        dispatch({
            type: GET_POST_BY_ID,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: POST_ACTIONS_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const likePost = (postId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: POST_ACTIONS_LOADING,
        })

        const token = getState().userLogin.userInfo.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        const { data } = await axios.put(`/api/post/like/${postId}`, {}, config)
        console.log(data);

        dispatch({
            type: LIKE_POST,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: POST_ACTIONS_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const unlikePost = (postId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: POST_ACTIONS_LOADING,
        })

        const token = getState().userLogin.userInfo.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        const { data } = await axios.put(`/api/post/unlike/${postId}`, {}, config)
        console.log(data);

        dispatch({
            type: UNLIKE_POST,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: POST_ACTIONS_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}