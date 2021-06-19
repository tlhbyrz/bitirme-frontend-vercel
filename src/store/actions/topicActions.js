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


export const getAllTopics = (topicId) => async (dispatch, getState) => {
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
            if(topicId){
                let filteredTopic = res.data.filter(item => item._id === topicId);
                if(filteredTopic.length > 0){
                    dispatch(setActiveTopic(filteredTopic[0]));
                    dispatch(getTimeline(filteredTopic[0]._id));
                }else{
                    dispatch(getTopicById(topicId, res.data))
                }
            }else{
                dispatch(setActiveTopic(res.data[0]));
                dispatch(getTimeline(res.data[0]._id));
            }
        }
        

    } catch (error) {
        console.log("getalltopics:", error.message)
        dispatch({
            type: TOPIC_REQ_ERROR,
            payload: error.message,
        })

        cogoToast.error("Konuları listelemede problem yaşıyoruz. Lütfen daha sonra tekrar deneyin!", { position: 'top-center',hideAfter: 6 });
    }
}


export const getTopicById = (topicId, allPosts) => async (dispatch, getState) => {
    try {
        const token = getState().userLogin.userInfo.token;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        }

        const res = await axios.get(APP_URL + `/api/post/topic/${topicId}`, config);
        dispatch(setActiveTopic(res.data));
        dispatch(getTimeline(res.data._id));

    } catch (error) {
        console.log("getTopicById", error.message);
        cogoToast.error("Görüntülemek istediğiniz konuyu bulamadık. Lütfen daha sonra tekrar deneyiniz!", { position: 'top-center' });

        dispatch(setActiveTopic(allPosts[0]));
        dispatch(getTimeline(allPosts[0]._id));
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

        const imgConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        }

        let fd = new FormData();
        fd.append("file", image)
        fd.append("title", title)
        fd.append("desc", text)
        fd.append("category", JSON.stringify(category))

        await axios.post(APP_URL + `/api/post/topic`, fd, imgConfig)
        handleClose();
        cogoToast.success("Yeni konu talebiniz başarıyla iletilmiştir!", { position: 'top-center' });

    } catch (error) {
        cogoToast.error("Hata oluştu. Lütfen daha sonra tekrar deneyin!", { position: 'top-center' });
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