import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVideoDetail,
  fetchRelatedVideos,
  fetchComments,
  clearDetail,
} from "../redux/detailSlice";
import { fetchChannelInfo } from "../redux/channelSlice";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { video, relatedVideos, comments } = useSelector(
    (state) => state.detail
  );
  const { channelInfo } = useSelector((state) => state.channel);

  useEffect(() => {
    if (id) {
      dispatch(fetchVideoDetail(id));
      dispatch(fetchRelatedVideos(id));
      dispatch(fetchComments(id));
    }

    return () => {
      dispatch(clearDetail());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (video) {
      dispatch(fetchChannelInfo(video.snippet.channelId));
    }
  }, [video, dispatch]);

  return (
    <div className="detail">
      <div className="video-detail">
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${id}`}
          className="react-player"
          controls
          playing
        />
        <h2>{video?.snippet?.title}</h2>
        <div className="video-stats">
          <div>
            <span>
              {Number(video?.statistics?.viewCount).toLocaleString("en-US")}
            </span>
            <span className="mx-2">•</span>
            <span>{moment(video?.snippet?.publishedAt).fromNow()}</span>
          </div>
          <div className="buttons">
            <span>
              <i className="fa-solid fa-thumbs-up"></i>
              {Number(video?.statistics?.likeCount).toLocaleString("en-US")}
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
        {channelInfo && (
          <div className="channel-detail">
            <Link to={`/channel/${video?.snippet?.channelId}`}>
              <img
                src={channelInfo?.snippet?.thumbnails?.high?.url}
                alt={channelInfo?.snippet?.title}
              />
              <span className="channel-info">
                <h3>{channelInfo.snippet.title}</h3>
                <p>
                  {" "}
                  {Number(
                    channelInfo?.statistics?.subscriberCount
                  ).toLocaleString("en-US")}{" "}
                  Subscribers
                </p>
              </span>
            </Link>
            <button>Subscribe</button>
          </div>
        )}
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
                      {Number(
                        comm?.snippet?.topLevelComment?.snippet?.likeCount
                      ).toLocaleString("en-US")}
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
        {relatedVideos?.map((video, i) => (
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
