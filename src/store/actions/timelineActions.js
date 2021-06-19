import {
    GET_TIMELINE_REQ,
    LIKE_TIMELINE_POST,
    UNLIKE_TIMELINE_POST,
    DISLIKE_TIMELINE_POST,
    UNDISLIKE_TIMELINE_POST, 
    GET_TIMELINE_SUCCESS,
    GET_TIMELINE_FAILURE,
    COMMENT_TIMELINE_POST,
    DELETE_COMMENT_TIMELINE_POST,
    SEND_NEW_POST_SUCCESS,
    SEND_NEW_POST_LOADING,
    SEND_NEW_POST_FAILURE,
    RESET_NEW_POST,
    SEND_NEW_POST_IMAGE,
    CLEAR_NEW_POST_IMAGE,
    DELETE_TIMELINE_POST
} from "../types"
import axios from "axios"
import cogoToast from 'cogo-toast';
import { APP_URL } from "../../constants/data"


export const getTimeline = (topicId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_TIMELINE_REQ,
        })

        const token = getState().userLogin.userInfo.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        const { data } = await axios.get(APP_URL + `/api/post/topic/${topicId}`, config)

        dispatch({
            type: GET_TIMELINE_SUCCESS,
            payload: data.posts,
        })

    } catch (error) {
        dispatch({
            type: GET_TIMELINE_FAILURE,
            payload: error.response && error.response.data.msg
                ? error.response.data.msg
                : error.message,
        })
    }
}


export const sendPost = (text, image, handleClose, cogoToast) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SEND_NEW_POST_LOADING,
        })

        const token = getState().userLogin.userInfo.token;
        const topicId = getState().allTopics.activeTopic;

        const imgConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },
        }

        let fd = new FormData();
        fd.append("file", image)
        fd.append("text", text)
        fd.append("topic_id", topicId._id)

        const res = await axios.post(APP_URL + `/api/post/`, fd, imgConfig)

        dispatch({
            type: SEND_NEW_POST_SUCCESS,
            payload: res.data.posts
        })

        cogoToast.success("Post gönderildi!", { position: 'top-center' });
        handleClose();

        setTimeout(() => {
            dispatch({
                type: RESET_NEW_POST
            })
        }, 4000);

    } catch (error) {
        dispatch({
            type: SEND_NEW_POST_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
        cogoToast.error("Hata oluştu. Lütfen daha sonra tekrar deneyiniz!", { position: 'top-center' });
    }
}


export const uploadImageToPost = (file) => async (dispatch, getState) => {
    try {
        /* dispatch({
            type: SEND_NEW_POST_LOADING,
        }) */

        const token = getState().userLogin.userInfo.token;

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            },
        }

        let fd = new FormData();
        fd.append("file", file)

        const { data } = await axios.post(APP_URL + `/api/post/uploadImage`, fd, config)
        console.log(data);

        dispatch({
            type: SEND_NEW_POST_IMAGE,
            payload: APP_URL + "/" + data.image,
        })

    } catch (error) {
        dispatch({
            type: SEND_NEW_POST_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const clearImageFromPost = () => async (dispatch) => {
    dispatch({
        type: CLEAR_NEW_POST_IMAGE
    })
}


export const likePost = (postId) => async (dispatch, getState) => {
    try {
        const token = getState().userLogin.userInfo.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        const { data } = await axios.put(APP_URL + `/api/post/like/${postId}`, {}, config)

        dispatch({
            type: LIKE_TIMELINE_POST,
            payload: { data, postId },
        })

    } catch (error) {
        dispatch({
            type: GET_TIMELINE_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const unlikePost = (postId) => async (dispatch, getState) => {
    try {
        const token = getState().userLogin.userInfo.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        const { data } = await axios.put(APP_URL + `/api/post/unlike/${postId}`, {}, config)

        dispatch({
            type: UNLIKE_TIMELINE_POST,
            payload: { data, postId },
        })

    } catch (error) {
        dispatch({
            type: GET_TIMELINE_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const dislikePost = (postId) => async (dispatch, getState) => {
    try {
        const token = getState().userLogin.userInfo.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        const { data } = await axios.put(APP_URL + `/api/post/dislike/${postId}`, {}, config)

        dispatch({
            type: DISLIKE_TIMELINE_POST,
            payload: { data, postId },
        })

    } catch (error) {
        dispatch({
            type: GET_TIMELINE_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const undislikePost = (postId) => async (dispatch, getState) => {
    try {
        const token = getState().userLogin.userInfo.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        const { data } = await axios.put(APP_URL + `/api/post/undislike/${postId}`, {}, config)
        console.log(data);

        dispatch({
            type: UNDISLIKE_TIMELINE_POST,
            payload: { data, postId },
        })

    } catch (error) {
        dispatch({
            type: GET_TIMELINE_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}


export const commentToPost = (postId, comment, cogoToast) => async (dispatch, getState) => {
    try {
        /* dispatch({
            type: GET_TIMELINE_REQ,
        }) */

        const token = getState().userLogin.userInfo.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        const { data } = await axios.post(APP_URL + `/api/post/comment/${postId}`, { text: comment }, config)

        cogoToast.success("Yorumun gönderildi!", { position: 'top-center', heading: 'Yorum yap!' });

        dispatch({
            type: COMMENT_TIMELINE_POST,
            payload: { data, postId },
        })

    } catch (error) {
        dispatch({
            type: GET_TIMELINE_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
        cogoToast.error("Hata oluştu. Lütfen daha sonra tekrar deneyiniz!", { position: 'top-center', heading: 'Yorum yap' });
    }
}


export const deleteCommentFromPost = (postId, commentId) => async (dispatch, getState) => {
    try {
        const token = getState().userLogin.userInfo.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        const { data } = await axios.delete(APP_URL + `/api/post/comment/${postId}/${commentId}`, config)

        dispatch({
            type: DELETE_COMMENT_TIMELINE_POST,
            payload: { data, postId },
        })

    } catch (error) {
        cogoToast.error("Hata oluştu. Lütfen daha sonra tekrar deneyiniz!", { position: 'top-center', heading: 'Yorum kaldır!' });
    }
}


export const deletePostFromTimeline = (postId) => async (dispatch, getState) => {
    try {
        const token = getState().userLogin.userInfo.token;
        const topicId = getState().allTopics.activeTopic._id;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        await axios.delete(APP_URL + `/api/post/${topicId}/${postId}`, config)
        cogoToast.success("Post başarıyla silindi!", { position: 'top-center', heading: 'Post SİL!' });

        dispatch({
            type: DELETE_TIMELINE_POST,
            payload: postId,
        })

    } catch (error) {
        cogoToast.error("Hata oluştu. Lütfen daha sonra tekrar deneyiniz!", { position: 'top-center', heading: 'Post SİL' });
    }
}