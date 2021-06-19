import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { resetPassword } from '../store/actions/userActions'
import useQuery from "../customHook/GetQueryParams"
import cogoToast from 'cogo-toast'


const NewPassword = ({ location, history }) => {
    let query = useQuery();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo, success } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push("/home");
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            cogoToast.error("Parolalar eşleşmiyor! Lütfen aynı parolayı giriğinizden emin olun!", { position: 'top-center' });
        } else {
            if(!confirmPassword || !password){
                cogoToast.error("parola kısmı boş bırakılamaz!", { position: 'top-center' });
                return;
            }
            dispatch(resetPassword(password, query.get("token")))
            setPassword("")
            setConfirmPassword("")
        }
    }

    return (
        <FormContainer>
            <h1 className="mt-5">YENİ ŞİFRE</h1>
            {
                error && error.map(item => (
                    <Message variant='danger'>{item}</Message>
                ))
            }
            {
                success && <Message variant='success'>{"Şİfreniz başarıyla değiştirilmiştir. Yeni şifrenizi kullanarak giriş yapabilirsiniz!"}</Message>
            }
            {loading && <Loader size="30px"/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='password'>
                    <Form.Label>Parola</Form.Label>
                    <Form.Control
                        type='password'
                        maxLength="50"
                        placeholder='Parolayı giriniz...'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Parola Tekrar</Form.Label>
                    <Form.Control
                        type='password'
                        maxLength="50"
                        placeholder='Parolayı tekrar giriniz...'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Kaydet
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Şifrenizi belirlediniz mi?{' '}
                    <Link to={query.get("topic") ? `/login?topic=${query.get("topic")}` : '/login'}>
                        Giriş Yapın
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default NewPassword