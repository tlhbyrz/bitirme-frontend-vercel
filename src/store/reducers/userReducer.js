import { USER_LOGIN_REQ, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGOUT } from "../types"
import { USER_REGISTER_REQ, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE } from "../types"
import { USER_UPDATE_REQ, USER_UPDATE_SUCCESS, USER_UPDATE_FAILURE } from "../types"
import { GET_AUTH_USER_REQ, GET_AUTH_USER_REQ_SUCCESS, GET_AUTH_USER_REQ_FAIL } from "../types"


const initialState = {
    userInfo: null,
    error: [],
    loading: false,
    success: false,
}


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQ:
        case USER_REGISTER_REQ:
        case USER_UPDATE_REQ:
            return {
                ...state,
                loading: true,
                success: false
            }
        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                loading: false,
                error: []
            }
        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                userInfo: action.payload,
                loading: false,
                error: [],
                success: true
            }
        case USER_LOGIN_FAILURE:
        case USER_REGISTER_FAILURE:
        case USER_UPDATE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case USER_LOGOUT:
            return {
                ...state,
                error: [],
                loading: false,
                userInfo: null
            }
        default:
            return state
    }
}



const initialAuthUser = {
    user: null,
    error: [],
    loading: false
}


export const userDetailReducer = (state = initialAuthUser, action) => {
    switch (action.type) {
        case GET_AUTH_USER_REQ:
            return {
                ...state,
                loading: true
            }
        case GET_AUTH_USER_REQ_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null
            }
        case GET_AUTH_USER_REQ_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}