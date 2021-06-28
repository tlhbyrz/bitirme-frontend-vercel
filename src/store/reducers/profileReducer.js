import { GET_PROFILEPAGE_TOPICS, SET_PROFILEPAGE_LOADING, SET_PROFILEPAGE_ERROR } from "../types"

const initialState = {
    topics: [],
    error: null,
    loading: false
}


export const profilePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILEPAGE_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_PROFILEPAGE_TOPICS:
            return {
                ...state,
                topics: action.payload,
                loading: false
            }
        case SET_PROFILEPAGE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}