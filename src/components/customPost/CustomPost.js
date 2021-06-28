import React, { useState, useEffect, forwardRef, useRef } from 'react'
import "./CustomPost.css"
import cogoToast from 'cogo-toast';
import { Link } from "react-router-dom"
import Lightbox from "react-awesome-lightbox";
import { useDispatch, useSelector } from "react-redux";

import { likePost, unlikePost, dislikePost, undislikePost, commentToPost, deletePostFromTimeline } from "../../store/actions/timelineActions"
import fromDateToNow from "date-fns/formatDistanceToNowStrict"
import { tr } from 'date-fns/locale'

import HeartSvg from "../../assets/heart.svg"
import ThumbupSvg from "../../assets/thumbs-up.svg"
import FlipMove from 'react-flip-move';
import TimeLİneComment from "./timelineComment/TimeLİneComment"
import { Button, Modal } from 'react-bootstrap';
import { Fragment } from 'react';
import { APP_URL } from "../../constants/data";

const CustomPost = forwardRef(({ posts, postDetail, loading }, ref) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userLogin);
    const { userInfo } = user;

    const [comment, setComment] = useState("");
    const [commentCount, setCommentCount] = useState(5);
    const [light, setlight] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [commented, setCommented] = useState(false);
    const [showOption, setShowOption] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    useEffect(() => {
        isLiked();
        isDisliked();
        isCommented();
    }, [sendComment, like])

    function isLiked() {
        if (postDetail.likes.find(like => like.user === userInfo._id)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }

    function isDisliked() {
        if (postDetail.dislikes.find(dislike => dislike.user === userInfo._id)) {
            setDisliked(true);
        } else {
            setDisliked(false);
        }
    }

    function isCommented() {
        if (postDetail.comments.find(comment => comment.user === userInfo._id)) {
            setCommented(true);
        } else {
            setCommented(false);
        }
    }

    function like() {
        if (!loading) {
            if (postDetail.likes.find(like => like.user === userInfo._id)) {
                dispatch(unlikePost(postDetail._id));
            } else {
                dispatch(likePost(postDetail._id));
            }
        }
    }

    function dislike() {
        if (!loading) {
            if (postDetail.dislikes.find(dislike => dislike.user === userInfo._id)) {
                dispatch(undislikePost(postDetail._id));
            } else {
                dispatch(dislikePost(postDetail._id));
            }
        }
    }

    function sendComment() {
        setComment("");
        if (comment.length > 0) {
            dispatch(commentToPost(postDetail._id, comment, cogoToast));
        }
    }

    function openLightbox() {
        setlight(!light)
    }

    function openDeletePopup() {
        setShowDeletePopup(true);
    }

    function closeDeletePopup() {
        setShowDeletePopup(false);
    }

    function deletePost() {
        dispatch(deletePostFromTimeline(postDetail._id));
        closeDeletePopup();
    }

    const optionsRef = useRef(null);
    useOutsideAlerter(optionsRef);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowOption(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    function moreComment(){
        setCommentCount(commentCount + 5);
    }

    return (
        <div ref={ref} className="custom-post">
            <div className="post-header">
                <Fragment >
                    <div className="post-author">
                        <img src={postDetail.avatar ? postDetail.avatar : "https://www.gravatar.com/avatar/"} alt="" />
                        <div className="detail">
                            <div className="name">{postDetail.name}</div>
                            <div className="job-title">
                                {userInfo.title ? userInfo.title === "beginner" ?  "Çırak Takipçi" : "Usta Takipçi" : "Çırak Takipçi"}
                            </div>
                            <div className="date">{fromDateToNow(new Date(postDetail.date), { locale: tr })} önce</div>
                        </div>
                    </div>
                </Fragment>
                <div role="button" tabIndex="0" className="more" ref={optionsRef} onClick={() => setShowOption(!showOption)}>
                    <i className="fas fa-ellipsis-h"></i>
                    <div className={showOption ? "post-options options-show" : "post-options"}>
                        {
                            userInfo._id === postDetail.user ?
                                <p className="post-option" onClick={openDeletePopup}>Sil</p> 
                            :
                            <>
                                <p className="post-option">Takip Et</p>
                                <p className="post-option">Bildir</p>
                            </>
                        }                        
                    </div>

                    <Modal show={showDeletePopup} onHide={closeDeletePopup}>
                        <Modal.Header closeButton>
                            <Modal.Title>Postu Silmek Üzeresiniz!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Onaylarsanız post kalıcı olarak kaldırılacakdır. 
                            Lütfen silmek istediğinizden emin olunuz!
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeDeletePopup}>
                                İPTAL
                            </Button>
                            <Button variant="danger" onClick={deletePost}>
                                SİL
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <div className="post-content">
                <p>
                    {postDetail.text}
                </p>
                {
                    postDetail.image &&
                    <>
                        <p>
                            <Link to="#" onClick={openLightbox}>
                                <img src={postDetail.image}  />
                            </Link>
                        </p>
                        {
                            light &&
                            <Lightbox zoomStep={0.7} image={postDetail.image} title="Önizleme" onClose={openLightbox} />
                        }
                    </>
                }

            </div>
            <div className="post-alt-detail">
                <div className="likes">
                    <img src={HeartSvg} />
                    <img src={ThumbupSvg} />
                    {postDetail.likes.length} Beğeni
				</div>
                <div className="likes">
                    {postDetail.dislikes.length} Olumsuz
                </div>
                <div className="comments">
                    {postDetail.comments.length} Yorum
                </div>
            </div>
            <div className="post-actions">
                <Link to="#" onClick={like}>
                    <div className={!liked ? "post-action" : "post-action-active"}>
                        <i className="far fa-thumbs-up"></i>
                        <p>Beğendim</p>
                    </div>
                </Link>
                <Link to="#" onClick={dislike}>
                    <div className={!disliked ? "post-action" : "post-action-active"}>
                        <i className="far fa-thumbs-down"></i>
                        <p>Beğenmedim</p>
                    </div>
                </Link>
                <Link to="#" onClick={() => setShowComment(!showComment)}>
                    <div className={!commented ? "post-action" : "post-action-active"} >
                        <i className="far fa-comments"></i>
                        <p>Yorum Yap</p>
                    </div>
                </Link>
                {/* <div className="post-action">
                    <i class="fas fa-share-alt"></i>
                    <p>Share</p>
                </div> */}
            </div>
            {
                showComment &&
                <div>
                    <div className="post-comment-form">
                        <img src={postDetail.avatar ? postDetail.avatar : "https://www.gravatar.com/avatar/"} alt="" />
                        <div className="textarea">
                            <textarea name="" placeholder="Yorumunuzu yazın..." id="" onChange={(e) => setComment(e.target.value)} value={comment}></textarea>
                            <label>
                                <input type="file" accept="image/*" />
                                <i className="fas fa-camera"></i>
                            </label>
                        </div>
                    </div>
                    <div className="align-right">
                        <button role="button" tabIndex="0" className="send-comment-btn" onClick={sendComment}>Gönder</button>
                    </div>

                    <FlipMove>
                        {
                            postDetail.comments.filter((_, index) => index < commentCount).map(comment => (
                                <TimeLİneComment comment={comment} postID={postDetail._id} key={comment._id} />
                            ))
                        }
                    </FlipMove>

                    { 
                        postDetail.comments.length > commentCount && (
                            <p className="more-comment-btn" onClick={moreComment}>Daha fazla...</p>
                        )
                    }
                </div>
            }

        </div>

    )
})

export default CustomPost
