import React from 'react'
import "./CustomPost.css"
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { likePost } from "../../store/actions/postActions"

const PostDetails = ({ where, postDetail }) => {
    let history = useHistory();
    const dispatch = useDispatch();

    function like() {
        // dispatch(likePost(postDetail._id));
    }

    return (
        <div className="custom-post">
            <div className="post-header">
                <a href="#" className="post-author">
                    <img src="https://thispersondoesnotexist.com/image" alt="" />
                    <div className="detail">
                        <div className="name">Test User</div>
                        <div className="job-title">Beginner Discount Tracer</div>
                        <div className="date">7 hour ago</div>
                    </div>
                </a>
                <div className="more">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            <div className="post-content">
                <p>
                    Random text content here...
				</p>
                <p>
                    <a href="#">#discount</a> <a href="#">#design</a> <a href="#">#bargains</a>
                </p>
                <p>
                    <img src="https://picsum.photos/400/300" alt="" />
                </p>
            </div>
            <div className="post-alt-detail">
                <div className="likes">
                    <i class="fas fa-heartbeat"></i>
                    <i class="fas fa-thumbs-up"></i>
						172
					</div>
                <div className="comments">
                    10 Comment
					</div>
            </div>
            <div className="post-actions">
                <div onClick={like} className="post-action">
                    <i class="far fa-thumbs-up"></i>
                    <p>Like</p>
                </div>
                <div className="post-action">
                    <i class="far fa-comments"></i>
                    <p> Comment</p>
                </div>
                <div className="post-action">
                    <i class="fas fa-share-alt"></i>
                    <p>Share</p>
                </div>
            </div>
            <div className="post-comment-form">
                <img src="https://thispersondoesnotexist.com/image" alt="" />
                <div className="textarea">
                    <textarea name="" placeholder="Write comment" id="" ></textarea>
                    <label>
                        <input type="file" accept="image/*" />
                        <i class="fas fa-camera"></i>
                    </label>
                </div>
            </div>
        </div>

    )
}

export default PostDetails
