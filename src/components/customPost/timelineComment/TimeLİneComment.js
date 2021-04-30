import React, { forwardRef, useRef, useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import fromDateToNow from "date-fns/formatDistanceToNowStrict"
import { Button, Modal } from 'react-bootstrap';
import { deleteCommentFromPost } from '../../../store/actions/timelineActions';

const TimeLİneComment = forwardRef(({ comment, postID }, ref) => {
    const dispatch = useDispatch();
    const [showOption, setShowOption] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    function openDeletePopup() {
        setShowDeletePopup(true);
    }

    function closeDeletePopup() {
        setShowDeletePopup(false);
    }

    function deleteComment() {
        dispatch(deleteCommentFromPost(postID, comment._id));
        closeDeletePopup();
    }

    const optionsRef = useRef(null);
    useOutsideAlerter(optionsRef);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShowOption(false);
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <div ref={ref} className="timeline-post-comment">
            <img src={comment.avatar ? comment.avatar : "https://www.gravatar.com/avatar/"} />
            <div className="timeline-post-comment-details">
                <p>{comment.name} </p>
                <p className="timeline-comment-date">{fromDateToNow(new Date(comment.date))} ago</p>
                <span>{comment.text}</span>
            </div>
            <div className="more" ref={optionsRef} onClick={() => setShowOption(!showOption)}>
                <i className="fas fa-ellipsis-h"></i>
                <div className={showOption ? "post-options options-show" : "post-options"}>
                    <p className="post-option">Report</p>
                    <p className="post-option" onClick={openDeletePopup}>Delete</p>
                </div>

                <Modal show={showDeletePopup} onHide={closeDeletePopup}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Post!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're about to permenantly delete comment. Are you sure!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeDeletePopup}>
                            Close
                            </Button>
                        <Button variant="danger" onClick={deleteComment}>
                            Delete
                            </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
})

export default TimeLİneComment
