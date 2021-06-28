import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { userReducer, userDetailReducer } from "./reducers/userReducer"
import { timelineReducer } from "./reducers/timelineReducer";
import { postReducer } from "./reducers/postReducer";
import { sendPostReducer } from "./reducers/sendPostReducer";
import { topicReducer } from "./reducers/topicReducer";
import { profilePageReducer } from "./reducers/profileReducer";

const reducer = combineReducers({
    userLogin: userReducer,
    userDetails: userDetailReducer,
    timeline: timelineReducer,
    postDetails: postReducer,
    newPost: sendPostReducer,
    allTopics: topicReducer,
    profilePage: profilePageReducer
})

const userInfosFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null


const initialState = {
    userLogin: { userInfo: userInfosFromStorage }
}

const middleware = [thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store