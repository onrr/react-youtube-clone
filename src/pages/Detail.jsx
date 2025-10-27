import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import moment from "moment";
import { FetchAPI } from "../utils/FetchApi";

const Detail = () => {
  const [detail, setDetail] = useState(null);
  const [suggestedVideo, setSuggestedVideo] = useState(null);
  const [comments, setComments] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    FetchAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setDetail(data.items[0])
    );

    FetchAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setSuggestedVideo(data.items.slice(0, 15))
    );

    FetchAPI(
      `commentThreads?part=snippet&videoId=${id}&maxResults=30order=date`
    ).then((data) => setComments(data.items.slice(0, 15)));
  }, [id]);

  return (
    <div className="detail">
      <div className="video-detail">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${id}`}
          className="react-player"
          controls
        />
        <h2>{detail?.snippet?.title}</h2>
        <div className="video-stats">
          <div>
            <span>{detail?.statistics?.viewCount}</span>
            <span className="mx-2">•</span>
            <span>{moment(detail?.snippet?.publishedAt).fromNow()}</span>
          </div>
          <div className="buttons">
            <span>
              <i className="fa-solid fa-thumbs-up"></i>
              {detail?.statistics?.likeCount}
            </span>
            <span>
              <i className="fa-solid fa-thumbs-down"></i>-
            </span>
            <span>
              <i className="fa-solid fa-share"></i>
              Share
            </span>
            <span>
              <i className="fa-solid fa-icons"></i>
              Save
            </span>
          </div>
        </div>
        <hr />
        <div className="channel-detail">
          <div>
            <i className="fa-solid fa-user-circle text-4xl"></i>
            <span className="channel-info">
              <h3>Channel Title</h3>
              <p>10M Subscribers</p>
            </span>
          </div>
          <button>Subscribe</button>
        </div>
        <hr />
        <div className="comments">
          <ul className="comment-list">
            {comments?.map((comm, i) => (
              <li key={i}>
                <i className="fa-solid fa-user-circle"></i>
                <div>
                  <div className="user-comment-info">
                    <span>
                      {
                        comm?.snippet?.topLevelComment?.snippet
                          ?.authorDisplayName
                      }
                    </span>
                    <span>
                      {" "}
                      {moment(
                        comm?.snippet?.topLevelComment?.snippet?.publishedAt
                      ).fromNow()}
                    </span>
                  </div>
                  <div className="user-comment-text">
                    <span>
                      {comm?.snippet?.topLevelComment?.snippet?.textOriginal}
                    </span>
                  </div>
                  <div className="user-comment-buttons">
                    <span>
                      <i className="fa-solid fa-thumbs-up"></i>
                      {comm?.snippet?.topLevelComment?.snippet?.likeCount}
                    </span>
                    <span>
                      <i className="fa-solid fa-thumbs-down"></i>-
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="suggested-videos">
        {suggestedVideo?.map((video, i) => (
          <div key={i} className="video-card">
            <Link to={`/video/${video?.id?.videoId}`}>
              <img
                src={video?.snippet?.thumbnails?.high?.url}
                alt={video?.snippet?.title}
              />
              <div className="info">
                <h3>{video?.snippet?.title}</h3>
                <p>
                  <span>
                    <i className="fa-solid fa-user-circle mr-2 text-base"></i>
                    {video?.snippet?.channelTitle}
                  </span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;
