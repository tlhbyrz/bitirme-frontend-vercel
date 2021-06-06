import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getAuthUser, updateUserInfo } from '../store/actions/userActions'

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo, success } = userLogin


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [ history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (!password) {
            setMessage('Lütfen şifrenizi giriniz!')
        }else if (password !== confirmPassword) {
            setMessage('Lütfen şifrenizin uyuştuğundan emin olun!')
        } else {
            setMessage(null);
            dispatch(updateUserInfo({ id: userInfo._id, name, email, password }))
        }
    }

    return (
        <Row>
            <Col md={2} lg={3}>
                
            </Col>
            <Col md={8} lg={6}>
                <h2 className="active-topic-header">Bilgilerini Güncelle</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {success && <Message variant='success'>{"Profil bilgileri güncellendi!"}</Message>}
                {
                    error && error.map(item => (
                        <Message variant='danger'>{item}</Message>
                    ))
                }
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Kullanıcı Adınız</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Kullanıocı adınızı yazınız...'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Adresiniz</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Emailinizi yazınız...'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Şifreniz</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Şifrenizi yazınız...'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Şifreniz Tekrar</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Şifrenizi tekrar yazınız...'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        GÜNCELLE
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default ProfileScreen