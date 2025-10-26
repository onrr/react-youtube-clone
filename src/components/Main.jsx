import React from "react";
import moment from "moment";

const Main = ({ videos }) => {

  return (
    <div className="main">
      {videos?.map((video, i) => (
        <div key={i} className="video-card">
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
              <span>{moment(video?.snippet?.publishTime).fromNow()}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Main;
