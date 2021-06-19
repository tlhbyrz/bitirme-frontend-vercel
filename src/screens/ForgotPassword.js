import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { forgotPassword } from '../store/actions/userActions'
import useQuery from "../customHook/GetQueryParams"
import cogoToast from 'cogo-toast'

const ForgotPassword = ({ history }) => {
    let query = useQuery();
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { error, userInfo, success, loading } = userLogin

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
        if(!email){
            cogoToast.error("Email boş bırakılamaz!", { position: 'top-center' });
            return;
        }
        dispatch(forgotPassword(email))
        setEmail("")
    }

    return (
        <FormContainer>
            <h1 className="mt-5">ŞİFREMİ SIFIRLA</h1>
            {
                error && error.map(item => (
                    <Message variant='danger'>{item}</Message>
                ))
            }
            {
                success && <Message variant='success'>{"Sifre sıfırlama maili başarıyla gönderilmiştir."}</Message>
            }
            {
                success && <Message variant='info'>{"İşlemi tamamlamak için 1 saatiniz bulunmaktadır. Lütfen belirtilen sürede işleminizi tamamlayınız!"}</Message>
            }
            {loading && <Loader size="30px"/>}
            <Form onSubmit={submitHandler} className="mt-3">
                <Form.Group controlId='email'>
                    <Form.Label>Lütfen mail adresinizi yazınız</Form.Label>
                    <Form.Control
                        type='email'
                        required={true}
                        maxLength="50"
                        placeholder='Emailinizi buraya girin...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    GÖNDER
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Bilgilerini hatırliyor musun?{' '}
                    <Link to={query.get("topic") ? `/login?topic=${query.get("topic")}` :  '/login'}>
                        Giriş Yap
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default ForgotPassword