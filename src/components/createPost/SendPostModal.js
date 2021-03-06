import React, { useState, useEffect, createRef } from 'react'
import "./SendPostModal.css"
import cogoToast from 'cogo-toast';
import { Modal, Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { clearImageFromPost, sendPost, uploadImageToPost } from "../../store/actions/timelineActions"
import Message from "../Message";
import Loader from "../Loader";
import { RESET_NEW_POST_ERROR } from '../../store/types';
import { ImageCompressor, getImageSize } from "compressor-img";

const SendPostModal = (props) => {
    const { show, handleClose } = props;
    const textRef = createRef()
    const file = createRef()

    const dispatch = useDispatch();
    const newPost = useSelector((state) => state.newPost);
    const { error, loading, success } = newPost;
    const [Image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [text, setText] = useState("");
    const [textError, setTextError] = useState(null);

    useEffect(() => {
        dispatch({
            type: RESET_NEW_POST_ERROR
        });
        setImagePreview(null);
        setImage(null)
        setText("")
        setTextError(null)

        if(show){
            textRef.current.focus()
        }
    }, [show, handleClose])

    function sendNewPost() {
        if (!text.length > 0) {
            setTextError("Açıklama uzunluğu 0'dan büyük olmalıdır!");
            return
        }
        if (text.length > 0) {
            dispatch(sendPost(text, Image, handleClose, cogoToast))
        }
        setText("");
        setTextError(null);
    }

    function uploadImage(e) {
        if(e.target.files.length > 0){
            if (e.target.files[0].size > 3000000) {
                cogoToast.error("Dosya büyüklüğü 3MB'dan büyük olamaz!", { position: 'top-center' });
                return;
            }
    
            if(e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpg" || e.target.files[0].type === "image/jpeg"){
                setImagePreview(URL.createObjectURL(e.target.files[0]));
                setImage(e.target.files[0]);
            }else{
                setImagePreview(null);
                setImage(null);
                cogoToast.error("Seçtiğiniz dosya formatı desteklenmemektedir!", { position: 'top-center', heading: 'Format Desteklenmiyor!' });
                return;
            }
        }
    }

    function clickToFile(){
        file.current.click()
    }

    function deleteImage() {
        setImage(null);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Yeni Post Oluştur</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {success && <Message variant='success'>{"Your post has been successfully created!"}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader size="30px"/>}
                <Form.Group controlId='text' >
                    <Form.Label>Mesajınız</Form.Label>
                    <div className="sendpost-textarea">
                        <textarea ref={textRef} name="post-content" placeholder="Mesajınızı buraya ekleyin..." id="" onChange={(e) => setText(e.target.value)} value={text}></textarea>
                    </div>
                    {
                        textError &&
                        <Form.Text className="text-danger">
                            {textError}
                        </Form.Text>
                    }
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fotoğraf eklemek için butona basınız</Form.Label>
                    <input ref={file} type="file" accept="image/*" onChange={(e) => uploadImage(e)}  id="add-gravatar-btn"/>
                    <div>
                        <button onClick={clickToFile} className="img-uploader-btn">Ekle</button>
                    </div>
                    {Image &&
                        <div className="modal-img-container">
                            <img className="send-post-img" src={imagePreview}></img>
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
