import React, { useState, useEffect, createRef } from 'react'
import "./CreateTopic.css"
import cogoToast from 'cogo-toast';
import axios from "axios";
import Select from 'react-select';
import { Modal, Form, Button, Alert } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import {  sendTopic  } from "../../store/actions/topicActions"
import {  options, allCategories  } from "../../constants/categories"
import { APP_URL } from "../../constants/data"
import Loader from '../Loader';


const CreateTopicModal = (props) => {
    const file = createRef()
    const { show, handleClose } = props;
    const dispatch = useDispatch();
    
    const allTopics = useSelector((state) => state.allTopics);
    const { loading } = allTopics;

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
    const [imageError, setImageError] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [titleError, setTitleError] = useState(null);
    const [textError, setTextError] = useState(null);
    const [categoriesError, setCategoriesError] = useState(null);

    useEffect(() =>{
        setMainCategory(null)
        setSubCategory(null)
        setImage(null)
        setImageError(null)
        setImagePreview(null)
        setTextError(null)
        setCategoriesError(null);
        setTitleError(null)
        setTitle("")
        setText("")
    }, [show])


    async function sendNewTopic() {
        if (!title.length > 0) {
            setTitleError("Konu uzunluğu 0'dan büyük olmalıdır!");
            return
        }else{
            setTitleError(null)
        }
        if (!mainCategory) {
            setCategoriesError("Kategori eklemelisin!");
            return
        }else{
            setCategoriesError(null);
        }
        if (!text.length > 0) {
            setTextError("Açıklama metninin uzunluğu 0'dan büyük olmalıdır!");
            return
        }else{
            setTextError(null)
        }
        if (!image) {
            setImageError("Başlığı doğruluğunu destekleyecek bir fotoğraf veya ekran görüntüsü eklemelisin!");
            return
        }else{
            setImageError(null)
        }

        if (text.length > 0 && title.length > 0) {
            try {
                let formatted = null;

                if(mainCategory && !subCategory && !categoryItem){
                    formatted = {
                        value: mainCategory.value,
                        label: mainCategory.label,
                        parent:{ 
                            value: mainCategory.value,
                            label: mainCategory.label
                        },
                        main:{ 
                            value: mainCategory.value,
                            label: mainCategory.label
                        }
                    }
                }else if(subCategory && !categoryItem){
                    formatted = {
                        value: subCategory.value,
                        label: subCategory.label,
                        parent:{ 
                            value: subCategory.value,
                            label: subCategory.label
                        },
                        main:{ 
                            value: mainCategory.value,
                            label: mainCategory.label
                        }
                    }
                }

                dispatch(sendTopic(title, text, formatted ? formatted : categoryItem, image, handleClose));

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
        if(e.target.files.length > 0){
            if (e.target.files[0].size > 3000000) {
                cogoToast.error("Dosya büyüklüğü 3MB'dan büyük olamaz!", { position: 'top-center', heading: 'Boyut Hatası!' });
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

    function handleCategory(options){
        setCategoryItem(null);
        setSubCategory(null);
        handleSubCategory(null)
        setMainCategory(options);
    }

    function handleSubCategory(options){
        setSubCategory(options);
    }

    function handleSelectCategory(options){
        setCategoryItem(options);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Yeni İndirim Ekle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="info">
                    <Alert.Heading>Önemli</Alert.Heading>
                    <p>
                        Yeni bir indirim eklerken kampanyanın devam ettiğinden emin olmalısın.
                        Kontroller sonrası güncel olmayan kampanyalar yayınlanmayacaktır!
                    </p>
                    <hr />
                    <p className="mb-0">
                        İndirimi kanıtlayacak bir ekran görüntüsü veya fotoğraf eklemeniz gerekmektedir!
                    </p>
                </Alert>

                {loading && <Loader size="30px"/>}
                <Form.Group controlId='text' >
                    <Form.Label>İndirim Başlığı</Form.Label>
                    <div className="sendpost-textarea">
                        <input name="post-content" placeholder="Başlığı buraya yaz..." id="topic-title" 
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
                    isClearable={true}
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
                        <Form.Label>Alt Kategoriyi Seç (*opsiyonel)</Form.Label>
                        <Select 
                        options={allCategories.find(item => item.value === mainCategory.value).categories?.map(item => {
                            return {
                                value: item.value,
                                label: item.label
                            }
                        })} 
                        isClearable={true}
                        onChange={handleSubCategory} />
                    </Form.Group>
                }
                {
                    subCategory && 
                    <Form.Group controlId='text' >
                        <Form.Label>Aradığın Ürünü Seç (*opsiyonel)</Form.Label>
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
                        isClearable={true}
                        onChange={handleSelectCategory} />
                    </Form.Group>
                }
                <Form.Group controlId='text' >
                    <Form.Label>Açıklama metni</Form.Label>
                    <div className="sendpost-textarea">
                        <textarea name="post-content" 
                            placeholder="Bu metin sabit post olarak yayınlanacaktır. Lütfen kampanya hakkında detayları buraya yazın!" id="topic-desc" 
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
                    <Form.Label>Fotoğraf veya ekran görüntüsü eklemek için butona basınız</Form.Label>
                    <input ref={file} type="file" accept="image/*" onChange={(e) => uploadImage(e)}  id="add-gravatar-btn"/>
                    <div>
                        <button onClick={clickToFile} className="img-uploader-btn">Ekle</button>
                    </div>
                    {image &&
                        <div className="modal-img-container">
                            <img className="send-post-img" src={imagePreview}></img>
                            <button onClick={deleteImage}>İptal Et</button>
                        </div>
                    }
                    {
                        imageError &&
                        <Form.Text className="text-danger">
                            {imageError}
                        </Form.Text>
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

