import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Sidebar from "../components/Sidebar";
import { FetchAPI } from "../utils/FetchApi";

const Channel = ({ isOpen, selectedCategory, setSelectedCategory }) => {
  const [channelInfo, setChannelInfo] = useState(null);
  const [channelVideos, setChannelVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    FetchAPI(`channels?part=snippet%2Cstatistics&id=${id}`).then((data) =>
      setChannelInfo(data.items[0])
    );

    FetchAPI(`search?channelId=${id}&part=snippet&order=date`).then((data) =>
      setChannelVideos(data.items)
    );
  }, []);

  return (
    <div className="channel">
      <Sidebar
        isOpen={isOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="channel-main">
        <div className="banner">
          <img
            src={channelInfo?.brandingSettings?.image?.bannerExternalUrl}
            alt={channelInfo?.snippet?.title}
          />
        </div>
        <div className="channel-detail">
          <div>
            <img
              src={channelInfo?.snippet?.thumbnails?.high?.url}
              alt={channelInfo?.snippet?.title}
            />
            <div className="channel-info">
              <h2>{channelInfo?.snippet?.title}</h2>
              <span>
                <p>{channelInfo?.snippet?.customUrl} •</p>
                <p>
                  {Number(
                    channelInfo?.statistics?.subscriberCount
                  ).toLocaleString("en-US")}{" "}
                  subscribers •
                </p>
                <p>{channelInfo?.statistics?.videoCount} video</p>
              </span>
            </div>
          </div>
          <button>Subscribe</button>
        </div>
        <div className="channel-videos">
          {channelVideos?.map((video, i) => (
            <div key={i} className="video-card">
              <Link to={`/video/${video?.id?.videoId}`}>
                <img
                  src={video?.snippet?.thumbnails?.high?.url}
                  alt={video?.snippet?.title}
                />
                <div className="info">
                  <h3>{video?.snippet?.title}</h3>
                  <p>
                    {video?.snippet?.channelTitle}
                    <span>{moment(video?.snippet?.publishTime).fromNow()}</span>
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Channel;
