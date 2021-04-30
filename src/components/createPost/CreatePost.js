import React, { useState } from 'react'
import "./CreatePost.css"
import SendPostModal from "./SendPostModal"

const CreatePost = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="create-post-container">
            <SendPostModal show={show} handleClose={handleClose} />
            <div onClick={handleShow} className="create-post-input">
                <i className="fas fa-edit"></i>
                <p>Yeni gönderi oluştur...</p>
            </div>

            <div className="send-post">
                <div className="send-post-icons">
                    <div className="send-post-icon">
                        <i className="fas fa-images"></i>
                        <p>Resim ekle</p>
                    </div>
                    <div className="send-post-icon">
                        <i className="fas fa-hashtag"></i>
                        <p>Yorum yap</p>
                    </div>
                </div>
                {/* <button className="send-post-btn">Send</button> */}
            </div>
        </div>
    )
}

export default CreatePost
