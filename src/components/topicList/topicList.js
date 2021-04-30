import React from 'react'
import "./topicList.css"
import { useSelector, useDispatch } from "react-redux";
import { getTimeline } from "../../store/actions/timelineActions";
import { setActiveTopic } from "../../store/actions/topicActions";
import format from "date-fns/format"

const colors = ["#FFC107", "#00C9A7", "#3F87F5", "#DE4436", "#886CFF", "#52C41A"];

const TopicList = () => {
    const dispatch = useDispatch();
    const allTopics = useSelector((state) => state.allTopics);
    const { topics, topicCategory } = allTopics;

    function changeTopic(topic) {
        dispatch(setActiveTopic(topic));
        dispatch(getTimeline(topic._id));
    }

    return (
        <section className="left-widget">
            <h5 className="topics-title">
                {topicCategory ? "'" + topicCategory.label +  "'"  + " hakkındaki konular:" : "En Yeniler"}
            </h5>

            <section className="topic-card-list">
            {
                topics.map((topic) => (
                    <div className="topic-card" key={topic._id} onClick={() => changeTopic(topic)}>
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
                ))
            }
            </section>
        </section>
    )
}

export default TopicList