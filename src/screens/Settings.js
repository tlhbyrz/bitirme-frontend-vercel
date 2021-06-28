import React, { useState, useEffect, createRef } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getAuthUser, updateUserInfo } from '../store/actions/userActions'
import cogoToast from 'cogo-toast';

const SettingScreen = ({ location, history }) => {
    const file = createRef()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState(null)
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
        if (password !== confirmPassword) {
            setMessage('Lütfen şifrenizin uyuştuğundan emin olun!')
        } else {
            setMessage(null);
            dispatch(updateUserInfo({ id: userInfo._id, name, email, password, avatar }))
        }
    }

    function uploadImage(e){
        e.preventDefault()
        file.current.click()
    }

    function handleAvatar(e){
        if(e.target.files){
            if (e.target.files[0]?.size > 1500000) {
                cogoToast.error("Dosya büyüklüğü 1.5MB'dan büyük olamaz!", { position: 'top-center' });
                return;
            }
            setAvatar(e.target.files[0])
            setAvatarPreview(URL.createObjectURL(e.target.files[0]))
        }
    }

    function clearAvatar(e){
        e.preventDefault()
        setAvatar(null)
        setAvatarPreview(null)
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
                {loading && <Loader size="30px"/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Kullanıcı Adınız</Form.Label>
                        <Form.Control
                            type='name'
                            maxLength="50"
                            placeholder='Kullanıocı adınızı yazınız...'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Adresiniz</Form.Label>
                        <Form.Control
                            type='email'
                            required={true}
                            maxLength="50"
                            placeholder='Emailinizi yazınız...'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Şifreniz</Form.Label>
                        <Form.Control
                            type='password'
                            maxLength="50"
                            placeholder='Şifrenizi yazınız...'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Şifreniz Tekrar</Form.Label>
                        <Form.Control
                            type='password'
                            maxLength="50"
                            placeholder='Şifrenizi tekrar yazınız...'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Avatarınızı değiştirmek için butona basınız.</Form.Label>
                        <input ref={file} type="file" accept="image/*" onChange={(e) => handleAvatar(e)}  id="add-gravatar-btn"/>
                        <div>
                            <button onClick={uploadImage} className="img-uploader-btn">Avatar Seç</button>
                        </div>
                        {avatarPreview &&
                            <div className="show-image-prev">
                                <img className="img-preview" src={avatarPreview}></img>
                                <button onClick={clearAvatar}>İptal Et</button>
                            </div>
                        }
                    </Form.Group>

                    <div className="align-right">
                        <Button type='submit' variant='primary'>
                            GÜNCELLE
                        </Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}

export default SettingScreen