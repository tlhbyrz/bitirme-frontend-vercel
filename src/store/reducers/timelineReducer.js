
import {
    SEND_NEW_POST_SUCCESS,
    GET_TIMELINE_REQ,
    LIKE_TIMELINE_POST,
    UNLIKE_TIMELINE_POST, 
    DISLIKE_TIMELINE_POST,
    UNDISLIKE_TIMELINE_POST, 
    GET_TIMELINE_SUCCESS,
    GET_TIMELINE_FAILURE,
    COMMENT_TIMELINE_POST,
    DELETE_COMMENT_TIMELINE_POST,
    DELETE_TIMELINE_POST
} from "../types"


const initialState = {
    timeline: [],
    error: null,
    loading: true,
}

export const timelineReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TIMELINE_REQ:
            return {
                ...state,
                loading: true,
                timeline: []
            }
        case GET_TIMELINE_SUCCESS:
            return {
                ...state,
                timeline: action.payload,
                loading: false,
                error: null
            }
        case SEND_NEW_POST_SUCCESS:
            return {
                ...state,
                timeline: action.payload
            }
        case DELETE_TIMELINE_POST:
            return {
                ...state,
                timeline: state.timeline.filter(post => post._id !== action.payload)
            }
        case LIKE_TIMELINE_POST:
        case UNLIKE_TIMELINE_POST:
            return {
                ...state,
                timeline: state.timeline.map((post) =>
                    post._id === action.payload.postId ? { ...post, likes: action.payload.data } : post
                ),
                loading: false,
            }
        case DISLIKE_TIMELINE_POST:
        case UNDISLIKE_TIMELINE_POST:
            return {
                ...state,
                timeline: state.timeline.map((post) =>
                    post._id === action.payload.postId ? { ...post, dislikes: action.payload.data } : post
                ),
                loading: false,
            }    
        case COMMENT_TIMELINE_POST:
            return {
                ...state,
                timeline: state.timeline.map((post) =>
                    post._id === action.payload.postId ? { ...post, comments: action.payload.data } : post
                ),
                loading: false,
            }
        case DELETE_COMMENT_TIMELINE_POST:
            return {
                ...state,
                timeline: state.timeline.map((post) =>
                    post._id === action.payload.postId ? { ...post, comments: action.payload.data } : post
                )
            }
        case GET_TIMELINE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}