import { GET_ALL_TOPICS,
    TOPIC_REQ_SUCCESS,
    TOPIC_REQ_ERROR,
    SET_ACTIVE_TOPIC, 
    SET_TOPIC_CATEGORY, 
    RESET_TOPIC_CATEGORY } from "../types"
import { getTimeline } from "./timelineActions"
import axios from "axios"
import cogoToast from 'cogo-toast';
import { APP_URL } from "../../constants/data"


export const getAllTopics = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ALL_TOPICS,
        })

        const token = getState().userLogin.userInfo.token;
        const topicCategory = getState().allTopics.topicCategory;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        let res;
        if(topicCategory){
            if(topicCategory.type === "main"){
                res = await axios.get(APP_URL + `/api/post/topic/maincategory/${topicCategory.value}`, config)
            }else if(topicCategory.type === "parent"){
                res = await axios.get(APP_URL + `/api/post/topic/parentcategory/${topicCategory.value}`, config)
            }else if(topicCategory.type === "item"){
                res = await axios.get(APP_URL + `/api/post/topic/category/${topicCategory.value}`, config)
            }else{
                res = await axios.get(APP_URL + `/api/post/topic/category/${topicCategory.value}`, config)
            }
        }else{
            res = await axios.get(APP_URL + '/api/post/topic', config)
        }

        dispatch({
            type: TOPIC_REQ_SUCCESS,
            payload: res.data,
        })

        if(res.data.length > 0) {
            dispatch(setActiveTopic(res.data[0]));
            dispatch(getTimeline(res.data[0]._id));
        }
        

    } catch (error) {
        dispatch({
            type: TOPIC_REQ_ERROR,
            payload: error.response && error.response.data.msg
                ? error.response.data.msg
                : error.message,
        })

        cogoToast.error("Konuları listelemede problem yaşıyoruz. Lütfen daha sonra tekrar deneyin!", { position: 'top-center', heading: 'Konular' });
    }
}


export const setActiveTopic = (topic) => async (dispatch) => {
    dispatch({
        type: SET_ACTIVE_TOPIC,
        payload: topic
    })
}


export const sendTopic = (title, text, category, image, handleClose) => async (dispatch, getState) => {
    try {
        const token = getState().userLogin.userInfo.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        await axios.post(APP_URL + `/api/post/topic`, {title: title, desc: text, category: category  , image: image }, config)
        handleClose();
        cogoToast.success("Yeni konu talebiniz başarıyla iletilmiştir!", { position: 'top-center', heading: 'Yeni İndirim' });

    } catch (error) {
        cogoToast.error("Hata oluştu. Lütfen daha sonra tekrar deneyin!", { position: 'top-center', heading: 'Yeni İndirim' });
    }
}


export const setTopicCategory = (category) => async (dispatch) => {
    dispatch({
        type: SET_TOPIC_CATEGORY,
        payload: category
    })
}

export const resetTopicCategory = () => async (dispatch) => {
    dispatch({
        type: RESET_TOPIC_CATEGORY
    })
}