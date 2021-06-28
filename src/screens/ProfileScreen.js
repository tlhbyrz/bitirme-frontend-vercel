import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ProfileTopicList from '../components/profileTopicList/profileTopicList'
import { getAllTopics } from '../store/actions/profileActions'

const ProfileScreen = ({ location, history }) => {
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch(getAllTopics());
    }, [])

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    }, [ history, userInfo])

    

    return (
        <Row>
            <Col md={2} lg={3}>
            </Col>

            <Col md={8} lg={6}>
                <ProfileTopicList />
            </Col>
        </Row>
    )
}

export default ProfileScreen