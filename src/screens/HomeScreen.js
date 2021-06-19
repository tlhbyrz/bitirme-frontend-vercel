import React, { useEffect, Fragment } from 'react'
import { Row, Col } from "react-bootstrap";
import {  useHistory  } from 'react-router-dom'
import CreatePost from "../components/createPost/CreatePost";
import FilterPostBy from '../components/filterPostBy/FilterPostBy';
import CustomPost from '../components/customPost/CustomPost';
import Loader from "../components/Loader"
import Message from "../components/Message"
import FlipMove from 'react-flip-move';
import TopicList from "../components/topicList/topicList"

import { useDispatch, useSelector } from "react-redux";
import { getTimeline } from "../store/actions/timelineActions"
import { getAllTopics, setTopicCategory, setActiveTopic } from "../store/actions/topicActions"
import { mainCategories } from "../constants/categories"
import useQuery from "../customHook/GetQueryParams"


const HomeScreen = ({ match }) => {
    let history = useHistory();
    let query = useQuery();
    
    const dispatch = useDispatch();
    const timelineReducer = useSelector((state) => state.timeline);
    const { timeline, error, loading } = timelineReducer;

    const allTopics = useSelector((state) => state.allTopics);
    const { topics, activeTopic, topicCategory } = allTopics;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            if(match.params.category){
                if(mainCategories.includes(match.params.category)){
                    dispatch(setTopicCategory({
                        value: match.params.category,
                        label: query.get("label") ? query.get("label") : match.params.category,
                        type: "main"
                    }))
                }
            }
            dispatch(getAllTopics(query.get("topic")));
        }else{
            if(query.get("topic")){
                history.push(`/login?topic=${query.get("topic")}`);
            }else{
                history.push(`/login`);
            }
        }
    }, []);

    useEffect(() =>{
        if(query.get("topic")){
            dispatch(getTimeline(query.get("topic")));
        }
    }, [query.get("topic")])

    return (
        <Row className='justify-content-md-center justify-content-xl-start mt-4'>
            <Col sm={12} md={{ span: 4 }} lg={3}>
                <TopicList />
            </Col>
            <Col xs={{ span: 12, order: "last" }} sm={{ span: 12, order: "last" }} md={{ span: 8 }} lg={{ span: 6 }}>
                {
                    activeTopic && topics.length > 0 && <CreatePost />
                }
                

                {
                    activeTopic && topics.length > 0 && <h2 className="active-topic-header">'{activeTopic.title}' konusu hakkında atılan postlar:</h2>
                }

                {
                    activeTopic === null || !topics.length > 0  ? 
                        <Fragment >
                            <Message variant='info'>
                                { 
                                    topicCategory ? topicCategory.label +  " için açılmış konu bulunmamaktadır!" 
                                    : "Post atılacak herhangi bir konu bulunmamaktadır!"
                                }
                            </Message>
                            <Message variant='info'>
                                Yeni bir konu oluşturmak için lütfen menüdeki 'Konu Oluştur' butonuna basınız!
                            </Message>
                        </Fragment>
                    
                    :
                    timeline.length === 0 && !loading && (
                        <Message variant='info'>
                            Konu hakkında görüntülenecek post bulunmamaktadır.
                            Post atmak için 'Yeni gönderi oluştur' butonuna basınız!
                        </Message>
                    )
                }

                {
                    !userInfo ? null
                        :
                        loading ? <Loader /> :
                            error ? <Message variant='danger'>{error}</Message> :
                                topics.length > 0 &&
                                <div className="timeline">
                                    <FlipMove>
                                        {
                                            timeline.map(post => (
                                                <CustomPost postDetail={post} key={post._id} posts={timeline} loading={loading} />
                                            ))
                                        }
                                    </FlipMove>
                                </div>
                }
            </Col>
            {/* <Col sm={{ span: 12 }} md={{ span: 9 }} lg={{ span: 3, order: "last" }}>
                <div className="right-widget"></div>
            </Col> */}
        </Row>
    )
}

export default HomeScreen
