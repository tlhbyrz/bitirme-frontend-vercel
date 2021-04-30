
import { GET_POST_BY_ID, LIKE_POST, UNLIKE_POST, SEND_COMMENT_POST, DELETE_COMMENT_POST, POST_ACTIONS_LOADING, POST_ACTIONS_FAILURE } from "../types"


const initialState = {
    post: null,
    error: null,
    loading: false,
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ACTIONS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_POST_BY_ID:
            return {
                ...state,
                post: action.payload,
                loading: false,
                error: null
            }
        case POST_ACTIONS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}