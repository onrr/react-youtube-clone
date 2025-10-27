import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import { FetchAPI } from "../utils/FetchApi";

const Search = ({ isOpen, selectedCategory, setSelectedCategory }) => {
  const [videos, setVideos] = useState(null);
  const { query } = useParams();

  useEffect(() => {
    setVideos(null)
    localStorage.setItem("selectedCategory", selectedCategory);

    FetchAPI(`search?part=snippet&q=${query}`).then((data) =>
      setVideos(data.items.slice(0, 15))
    );
  }, [query, selectedCategory]);

  return (
    <div className="search">
      <Sidebar
        isOpen={isOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="search-main">
        {videos?.map((video, i) => (
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
                  <span>{moment(video?.snippet?.publishTime).fromNow()}</span>
                </p>
                <div className="desc">{video?.snippet?.description}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
