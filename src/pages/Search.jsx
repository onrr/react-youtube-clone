import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchResults,
  setSearchQuery,
} from "../redux/searchSlice";

const Search = () => {
  const dispatch = useDispatch();
  const { query } = useParams();

  const { results } = useSelector((state) => state.search);

  useEffect(() => {
    if (query) {
      dispatch(setSearchQuery(query));
      dispatch(fetchSearchResults(query));
    }
  }, [dispatch, query]);

  return (
    <div className="search">
      <Sidebar />
      <div className="search-main">
        {results?.map((video, i) => (
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
