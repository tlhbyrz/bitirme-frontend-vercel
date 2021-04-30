import React, { useState, useEffect } from 'react'
import "./CreateTopic.css"
import cogoToast from 'cogo-toast';
import axios from "axios";
import Select from 'react-select';
import { Modal, Form, Button, Alert } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import {  sendTopic  } from "../../store/actions/topicActions"
import {  options, allCategories  } from "../../constants/categories"
import { APP_URL } from "../../constants/data"


const CreateTopicModal = (props) => {
    const { show, handleClose } = props;
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;
    const token = userInfo ? userInfo.token : null;

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [categories, setCategories] = useState([]);
    const [mainCategory, setMainCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [categoryItem, setCategoryItem] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [titleError, setTitleError] = useState(null);
    const [textError, setTextError] = useState(null);
    const [categoriesError, setCategoriesError] = useState(null);


    async function sendNewTopic() {
        if (!title.length > 0) {
            setTitleError("Konu uzunluğu 0'dan büyük olmalıdır!");
            return
        }else{
            setTitleError(null)
        }
        if (!text.length > 0) {
            setTextError("Açıklama metninin uzunluğu 0'dan büyük olmalıdır!");
            return
        }else{
            setTextError(null)
        }
        if (!categoryItem > 0) {
            setCategoriesError("Kategori eklemelisin!");
            return
        }else{
            setCategoriesError(null);
        }

        if (text.length > 0 && title.length > 0) {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            }
    
            let fd = new FormData();
            fd.append("file", image)
    
            try {
                const { data } = await axios.post(APP_URL + `/api/post/uploadImage`, fd, config);
                dispatch(sendTopic(title, text, categoryItem, data.image, handleClose));

            } catch (error) {
                console.log(error.message);
                cogoToast.error("Hata oluştu. Lütfen daha sonra tekrar deneyiniz.!", { position: 'top-center' });
            }
        }

        setTitle("");
        setText("");
        setTitleError(null);
        setTextError(null);
        setCategoriesError(null);
        setImage(null);
        setImagePreview(null);
    }

    function uploadImage(e) {
        if (e.target.files[0].size > 1500000) {
            cogoToast.error("Dosya büyüklüğü 1.5MB'dan büyük olamaz!", { position: 'top-center', heading: 'Too Big!' });
            return;
        }
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
    }

    function deleteImage() {
        setImage(null);
    }

    function handleCategory(options){
        console.log("main",options);
        setMainCategory(options);
    }

    function handleSubCategory(options){
        console.log("sub",options);
        setSubCategory(options);
    }

    function handleSelectCategory(options){
        console.log("items",options);
        setCategoryItem(options);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Yeni Konu Oluştur</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Alert variant="info">
                <Alert.Heading>Önemli</Alert.Heading>
                <p>
                    Yeni bir konu oluştururken indirimin devam ettiğinden emin olmalısın.
                    Kontroller sonrası güncel olmayan konular yayınlanmayacaktır!
                </p>
                <hr />
                <p className="mb-0">
                    Kontrollere yardımcı olmak için lütfen resim yükleyiniz!
                </p>
            </Alert>

                <Form.Group controlId='text' >
                    <Form.Label>Konu Başlığı</Form.Label>
                    <div className="sendpost-textarea">
                        <input name="post-content" placeholder="Konuyu buraya yaz..." id="topic-title" 
                        onChange={(e) => setTitle(e.target.value)} value={title}></input>
                    </div>
                    {
                        titleError &&
                        <Form.Text className="text-danger">
                            {titleError}
                        </Form.Text>
                    }
                </Form.Group>
                <Form.Group controlId='text' >
                    <Form.Label>Ana Kategoriyi Seç</Form.Label>
                    <Select 
                    options={allCategories.map(item => {
                        return {
                            value: item.value,
                            label: item.label
                        }
                    })} 
                    onChange={handleCategory} />
                    {
                        categoriesError &&
                        <Form.Text className="text-danger">
                            {categoriesError}
                        </Form.Text>
                    }
                </Form.Group>
                {
                    mainCategory && 
                    <Form.Group controlId='text' >
                        <Form.Label>Alt Kategoriyi Seç</Form.Label>
                        <Select 
                        options={allCategories.find(item => item.value === mainCategory.value).categories?.map(item => {
                            return {
                                value: item.value,
                                label: item.label
                            }
                        })} 
                        onChange={handleSubCategory} />
                    </Form.Group>
                }
                {
                    subCategory && 
                    <Form.Group controlId='text' >
                        <Form.Label>Aradığın Ürünü Seç</Form.Label>
                        <Select 
                        options={allCategories.find(item => item.value === mainCategory.value).categories
                            .find(item => item.value === subCategory.value).items?.map(item => {
                            return {
                                value: item.value,
                                label: item.label,
                                parent: item.parent ? item.parent : { 
                                    value: "unknown",
                                    label: "Unknown"
                                },
                                main: item.main ? item.main : { 
                                    value: "unknown",
                                    label: "Unknown"
                                }
                            }
                        })} 
                        onChange={handleSelectCategory} />
                    </Form.Group>
                }
                <Form.Group controlId='text' >
                    <Form.Label>Açıklama metni</Form.Label>
                    <div className="sendpost-textarea">
                        <textarea name="post-content" 
                            placeholder="Bu metin yayınlanmayacaktır. İnidirimlerin kontrolü için gereklidir..." id="topic-desc" 
                            onChange={(e) => setText(e.target.value)} value={text}>
                        </textarea>
                    </div>
                    {
                        textError &&
                        <Form.Text className="text-danger">
                            {textError}
                        </Form.Text>
                    }
                </Form.Group>
                <Form.Group>
                    <Form.File onChange={(e) => uploadImage(e)} id="exampleFormControlFile1" label="Kontroller için resim yükleyiniz!" />
                    {image &&
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
                <Button variant="primary" onClick={sendNewTopic}>
                    Gönder
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateTopicModal
