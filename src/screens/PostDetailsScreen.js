import React, { useEffect } from 'react'
import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader"
import Message from "../components/Message"
import PostDetailsComponent from '../components/customPost/postDetails';

import { useDispatch, useSelector } from "react-redux";
import { getPostById } from "../store/actions/postActions"

const PostDetailsScreen = ({ match }) => {
    const id = match.params.id;

    const dispatch = useDispatch();
    const postDetails = useSelector((state) => state.postDetails);
    const { post, error, loading } = postDetails;

    useEffect(() => {
        dispatch(getPostById(id));
    }, [])

    return (
        <Row>
            <Col sm={12} md={3}>Sol widget</Col>
            <Col xs={{ span: 12, order: "last" }} sm={{ span: 12, order: "last" }} md={{ span: 6 }}>
                {
                    loading ? <Loader size="30px"/> :
                        error ? <Message variant='danger'>{error}</Message> :
                            <PostDetailsComponent postDetail={post} />
                }
            </Col>
            <Col sm={{ span: 12 }} md={{ span: 3, order: "last" }}>Sağ widget</Col>
        </Row>
    )
}

export default PostDetailsScreen
