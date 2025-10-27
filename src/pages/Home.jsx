import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { useEffect, useState } from "react";
import { FetchAPI } from "../utils/FetchApi";

const Home = ({ isOpen, selectedCategory, setSelectedCategory }) => {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    setVideos(null);
    localStorage.setItem("selectedCategory", selectedCategory);

    FetchAPI(`search?part=snippet&q=${selectedCategory}`).then((data) =>
      setVideos(data.items)
    );
  }, [selectedCategory]);

  return (
    <div className="home">
      <Sidebar
        isOpen={isOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Main videos={videos} />
    </div>
  );
};

export default Home;
