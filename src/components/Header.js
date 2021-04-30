import React, { Fragment, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'
import { Link, useHistory, useLocation  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../store/actions/userActions"
import CreateTopicModal from './createTopic/CreateTopic'

const Header = () => {
    let location = useLocation().pathname.split("/")[1];
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let history = useHistory();
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        history.push("/login");
        dispatch(logout())
    }


    return (
        <header>
            <CreateTopicModal show={show} handleClose={handleClose} />

            <Navbar bg='dark' variant='dark' expand="lg"  collapseOnSelect fixed="top">
                <Container>
                    <Navbar.Brand href='/'>GETİR Bİ İNDİRİM</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                            {userInfo ? (
                                <Fragment>
                                    <LinkContainer to='/'>
                                        <Nav.Link >
                                            <i className='fas fa-home'></i> Anasayfa
                                        </Nav.Link>
                                    </LinkContainer>
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item><i className='fas fa-user'></i> Profil</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            <i className='fas fa-sign-out-alt'></i> Çıkış
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <Button variant='info' size="sm" onClick={handleShow}>Konu Oluştur</Button>
                                </Fragment>
                            ) : location !== "login" ? 
                            <LinkContainer to='/login'>
                                <Nav.Link>
                                    <i className='fas fa-user'></i> Giriş
                                </Nav.Link>
                            </LinkContainer> :
                            <LinkContainer to='/register'>
                                <Nav.Link>
                                    <i className='fas fa-user'></i> Kayıt Ol
                                </Nav.Link>
                            </LinkContainer> }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header