
import {
    SEND_NEW_POST_SUCCESS,
    SEND_NEW_POST_LOADING,
    SEND_NEW_POST_FAILURE,
    RESET_NEW_POST,
    SEND_NEW_POST_IMAGE,
    RESET_NEW_POST_ERROR,
    CLEAR_NEW_POST_IMAGE
} from "../types"


const initialState = {
    post: null,
    image: null,
    error: null,
    loading: false,
    success: false
}

export const sendPostReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_NEW_POST_LOADING:
            return {
                ...state,
                loading: true,
                success: false
            }
        case SEND_NEW_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                success: true
            }
        case SEND_NEW_POST_IMAGE:
            return {
                ...state,
                image: action.payload
            }
        case CLEAR_NEW_POST_IMAGE:
            return {
                ...state,
                image: null
            }
        case RESET_NEW_POST:
            return {
                ...state,
                loading: false,
                error: null,
                success: false,
                image: null
            }
        case RESET_NEW_POST_ERROR:
            return {
                ...state,
                loading: false,
                error: null,
                success: false
            }
        case SEND_NEW_POST_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                success: false
            }
        default:
            return state
    }
}