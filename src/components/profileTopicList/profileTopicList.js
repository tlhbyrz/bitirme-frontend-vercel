import React, {useState} from 'react'
import "./profileTopicList.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Lightbox from "react-awesome-lightbox";
import Message from '../Message'
import Loader from '../Loader'
import { useHistory  } from 'react-router-dom'

const ProfileTopicList = () => {
    let history = useHistory();
    const [light, setlight] = useState(false);

    const profilePage = useSelector((state) => state.profilePage)
    const { loading, error, topics } = profilePage

    function openLightbox() {
        setlight(!light)
    }

    function gotoTopic(id){
        history.push(`/home?topic=${id}`)
    }

    return (
        <>
            <div className="topic-list-createdby-me">
                <h2 className="active-topic-header">Yayınlanmış İndirimleriniz</h2>   
                <Message variant='info'>{"Eğer oluşturduğunuz indirimi bulamadıysanız henüz onay verilmemiş veya reddedilmiş olabilir."}</Message>
                {
                    loading && <Loader size="30px"/>
                }
                {
                    error && <Message variant='danger'>{error}</Message>
                }
                {
                    topics.length === 0 && !error && !loading && <Message variant='danger'>{"Yayınlanmış herhangi bir indirim bulunamadı!"}</Message>
                } 
                {
                    topics.map((topic) =>(
                        <div key={topic._id} className="my-topic-wrapper">
                            <div className="topic-createdby-me">
                                <img src={ topic.image } alt="topic-img" onClick={openLightbox}/>
                                <h5>{ topic.title }</h5>

                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <span className="my-topic-category">{ topic.category.label }</span>
                                </div>
                                
                                <p className="my-topic-date">
                                    {
                                        (parseInt(new Date(topic.date).getUTCDate()) + 1) + " / " + (parseInt(new Date(topic.date).getUTCMonth()) + 1) + " / " + new Date(topic.date).getUTCFullYear()
                                    }
                                </p>
                                <p className="my-topic-desc">{ topic.desc }</p>

                                <button className="my-topic-btn" onClick={() => gotoTopic(topic._id)}>Git</button>
                                
                                {
                                    light &&
                                    <Lightbox zoomStep={0.7} image={topic.image} title="İndirim Resmi" onClose={openLightbox} />
                                }
                            </div>
                        </div>
                    ))
                }  
            </div>
        </>
    )
}

export default ProfileTopicList
