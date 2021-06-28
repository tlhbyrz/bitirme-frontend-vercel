import { GET_PROFILEPAGE_TOPICS, SET_PROFILEPAGE_LOADING, SET_PROFILEPAGE_ERROR } from "../types"
import axios from "axios"
import { APP_URL } from "../../constants/data"


export const getAllTopics = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: SET_PROFILEPAGE_LOADING
        })

        const token = getState().userLogin.userInfo.token;
        const userid = getState().userLogin.userInfo._id;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        const params = {
            userid: userid
        }

        const res = await axios.post(APP_URL + `/api/post/topic/createdby-user`, params, config);
        dispatch({
            type: GET_PROFILEPAGE_TOPICS,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: SET_PROFILEPAGE_ERROR,
            payload: "Bilgileriniz Alınamıyor. Lütfen daha sonra tekrar deneyiniz!"
        })
    }
}