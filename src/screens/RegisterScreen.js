import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../store/actions/userActions'
import useQuery from "../customHook/GetQueryParams"
import cogoToast from 'cogo-toast'


const RegisterScreen = ({ location, history }) => {
    let query = useQuery();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    const dispatch = useDispatch()


    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            if(query.get("topic")){
                history.push(`/home?topic=${query.get("topic")}`);
            }else{
                history.push("/home");
            }
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            cogoToast.error("Parolalar eşleşmiyor! Lütfen aynı parolayı giriğinizden emin olun!", { position: 'top-center' });
        } else {
            setMessage(null)
            if(!email || !password || !name){
                cogoToast.error("isim, email veya parola kısmı boş bırakılamaz!", { position: 'top-center' });
                return;
            }
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1 className="mt-5">KAYDOL</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {
                error && error.map(item => (
                    <Message variant='danger'>{item}</Message>
                ))
            }
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Adınız</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Adınızı giriniz...'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Adresiniz</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Emailinizi giriniz...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                    <Form.Text className="text-muted">
                        Kişisel bilgileriniz kimseyle paylaşılmayacaktır.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Parola</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Parolayı giriniz...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Parola Tekrar</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Parolayı tekrar giriniz...'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Kaydol
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Zaten bir hesabınız var mı?{' '}
                    <Link to={query.get("topic") ? `/login?topic=${query.get("topic")}` : '/login'}>
                        Giriş Yapın
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen