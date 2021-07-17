import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login, googleLogin } from '../store/actions/userActions'
import useQuery from "../customHook/GetQueryParams"
import cogoToast from 'cogo-toast'
import { GoogleLogin } from 'react-google-login';

const LoginScreen = ({ location, history }) => {
    let query = useQuery();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            if(query.get("topic")){
                history.push(`/home?topic=${query.get("topic")}`);
            }else{
                history.push("/home");
            }
        }
    }, [history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if(!email || !password){
            cogoToast.error("Email veya parola kısmı boş bırakılamaz!", { position: 'top-center' });
            return;
        }
        const ORIGIN = "app"
        dispatch(login(email, password, ORIGIN))
    }

    const responseGoogle = (response) => {
        const ORIGIN = "google"
        const { profileObj } = response
        dispatch(googleLogin(profileObj.email, profileObj.name, profileObj.imageUrl, ORIGIN))
    }

    return (
        <FormContainer>
            <h1 className="mt-5">GİRİŞ YAP</h1>
            {
                error && error.map(item => (
                    <Message variant='danger' key={item}>{item}</Message>
                ))
            }
            {loading && <Loader size="30px"/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Adresiniz</Form.Label>
                    <Form.Control
                        type='email'
                        required={true}
                        maxLength="50"
                        placeholder='Emailinizi buraya girin...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Parola</Form.Label>
                    <Form.Control
                        type='password'
                        maxLength="50"
                        placeholder='Parolanızı buraya girin...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Row className='mb-1'>
                    <Col className="align-right">
                        <Link to={'/forgot-password'}>
                            Şifremi Unuttum
                        </Link>
                    </Col>
                </Row>

                <Button type='submit' variant='primary'>
                    GİRİŞ YAP
                </Button>

                <div className="py-3">
                    <GoogleLogin
                        clientId="1063455069693-koqals26noom2eot8eu59g96hr38qee3.apps.googleusercontent.com"
                        /* render={renderProps => (
                            <Button variant='info' onClick={renderProps.onClick} disabled={renderProps.disabled}>GOOGLE İLE GİRİŞ YAP</Button>
                        )}  */                 
                        buttonText="Google ile Giriş Yap"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </Form>

            <Row className='py-3'>
                <Col>
                    Henüz hesabınız yok mu?{' '}
                    <Link to={query.get("topic") ? `/register?topic=${query.get("topic")}` :  '/register'}>
                        Hemen Kaydol
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen