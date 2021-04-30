import React, { useState, useEffect } from 'react'
import "./SendPostModal.css"
import cogoToast from 'cogo-toast';
import { Modal, Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { clearImageFromPost, sendPost, uploadImageToPost } from "../../store/actions/timelineActions"
import Message from "../Message";
import Loader from "../Loader";
import { RESET_NEW_POST_ERROR } from '../../store/types';

const SendPostModal = (props) => {
    const { show, handleClose } = props;
    const dispatch = useDispatch();
    const newPost = useSelector((state) => state.newPost);
    const { error, loading, success, image } = newPost;

    const [text, setText] = useState("");
    const [textError, setTextError] = useState(null);

    useEffect(() => {
        dispatch({
            type: RESET_NEW_POST_ERROR
        });
    }, [])

    function sendNewPost() {
        if (!text.length > 0) {
            setTextError("Açıklama uzunluğu 0'dan büyük olmalıdır!");
            return
        }
        if (text.length > 0) {
            dispatch(sendPost(text, image, handleClose, cogoToast))
        }
        setText("");
        setTextError(null);
    }

    function uploadImage(e) {
        if (e.target.files[0].size > 1500000) {
            cogoToast.error("Dosya büyüklüğü 1.5MB'dan büyük olamaz!", { position: 'top-center', heading: 'Too Big!' });
            return;
        }
        dispatch(uploadImageToPost(e.target.files[0]));
    }

    function deleteImage() {
        dispatch(clearImageFromPost());
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Yeni Post Oluştur</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {success && <Message variant='success'>{"Your post has been successfully created!"}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form.Group controlId='text' >
                    <Form.Label>Mesajınız</Form.Label>
                    <div className="sendpost-textarea">
                        <textarea name="post-content" placeholder="Mesajınızı buraya ekleyin..." id="" onChange={(e) => setText(e.target.value)} value={text}></textarea>
                    </div>
                    {
                        textError &&
                        <Form.Text className="text-danger">
                            {textError}
                        </Form.Text>
                    }
                </Form.Group>
                <Form.Group>
                    <Form.File onChange={(e) => uploadImage(e)} id="exampleFormControlFile1" label="Posta resim eklemek için butona basın." />
                    {image &&
                        <div className="modal-img-container">
                            <img className="send-post-img" src={image}></img>
                            <button onClick={deleteImage}>İptal Et</button>
                        </div>
                    }
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Kapat
                </Button>
                <Button variant="primary" onClick={sendNewPost}>
                    Gönder
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SendPostModal
