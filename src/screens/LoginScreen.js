import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../store/actions/userActions'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push("/");
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1 className="mt-5">GİRİŞ YAP</h1>
            {
                error && error.map(item => (
                    <Message variant='danger'>{item}</Message>
                ))
            }
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Adresiniz</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Emailinizi buraya girin...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Parola</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Parolanızı buraya girin...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    GİRİŞ YAP
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Henüz hesabınız yok mu?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Hemen Kaydol
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen