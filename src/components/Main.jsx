import React, { useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchVideos } from "../redux/youtubeSlice";

const Main = () => {
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.youtube);
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );

  useEffect(() => {
    dispatch(fetchVideos(selectedCategory));
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory, dispatch]);

  return (
    <div className="main">
      {videos?.map((video, i) => (
        <div key={i} className="video-card">
          <Link to={`/video/${video?.id?.videoId}`} className="mx-2">
            <img
              src={video?.snippet?.thumbnails?.high?.url}
              alt={video?.snippet?.title}
            />
            <h3>{video?.snippet?.title}</h3>
          </Link>
          <div className="info">
            <p>
              <Link to={`/channel/${video?.snippet?.channelId}`}>
                <i className="fa-solid fa-user-circle mr-2 text-base"></i>
                {video?.snippet?.channelTitle}
              </Link>
              <span>{moment(video?.snippet?.publishTime).fromNow()}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Main;
