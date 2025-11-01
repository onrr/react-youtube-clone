import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelInfo, fetchChannelVideos } from "../redux/channelSlice";

const Channel = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { channelInfo, channelVideos } = useSelector((state) => state.channel);

  useEffect(() => {
    dispatch(fetchChannelInfo(id));
    dispatch(fetchChannelVideos(id));
  }, [id, dispatch]);

  return (
    <div className="channel">
      <Sidebar />
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
