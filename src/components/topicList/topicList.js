import React from 'react'
import "./topicList.css"
import { useSelector, useDispatch } from "react-redux";
import { setActiveTopic } from "../../store/actions/topicActions";
import format from "date-fns/format"
import Loader from "../../components/Loader"
import { Link } from "react-router-dom"


const TopicList = () => {
    const dispatch = useDispatch();
    const allTopics = useSelector((state) => state.allTopics);
    const { topics, topicCategory, loading } = allTopics;

    function changeTopic(topic) {
        dispatch(setActiveTopic(topic));
    }

    return (
        <section className="left-widget">
            {
                (!loading && topics.length === 0) ? null :
                <h5 className="topics-title">
                    {topicCategory ? "'" + topicCategory.label +  "'"  + " hakkındaki konular:" : "En Yeniler"}
                </h5>
            }

            <section className="topic-card-list">
            {
                loading ? <Loader size="30px" /> : 
                topics.map((topic) => (
                    <Link to={`/home?topic=${topic._id}`} onClick={() => changeTopic(topic)} key={topic._id}>
                        <div className="topic-card"  >
                            <p className="topic-card-text">
                                    { topic.title }
                            </p>
                            <div className="topic-card-badges">
                            <span className="topic-card-badge"  style={{ background: "#00C9A7" }}>
                                {topic.category.label.toLowerCase()}
                            </span>
                            </div>
                            <section className="topic-card-footer">
                                <span className="topic-card-date">
                                    { format(new Date(topic.date), 'MM/dd/yyyy')  }
                                </span>
                                <span className="topic-card-postCount">
                                    { topic.posts.length } posts
                                </span>
                            </section>
                        </div>
                    </Link>
                ))
            }
            </section>
        </section>
    )
}

export default TopicList
