import { GET_ALL_TOPICS,
    GET_SINGLE_TOPIC,
    TOPIC_REQ_SUCCESS,
    TOPIC_REQ_ERROR,
    SET_ACTIVE_TOPIC,
    SET_TOPIC_CATEGORY,
    RESET_TOPIC_CATEGORY } from "../types";


const initialState = {
    topics: [],
    activeTopic: null,
    topicCategory: null,
    pagination: 0,
    loading: false,
    error: false
}

export const topicReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_TOPICS:
            return {
                ...state,
                loading: true
            }
        case SET_ACTIVE_TOPIC:
            return {
                ...state,
                activeTopic: action.payload
            } 
        case SET_TOPIC_CATEGORY:
            return {
                ...state,
                topicCategory: action.payload
            } 
        case RESET_TOPIC_CATEGORY:
            return {
                ...state,
                topicCategory: null
            }    
        case TOPIC_REQ_SUCCESS:
            return {
                ...state,
                topics: action.payload
            }
        case GET_SINGLE_TOPIC:
            return {
                ...state,
                activeTopic: action.payload,
                loading: false,
                error: null
            }
        case TOPIC_REQ_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}