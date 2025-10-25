import Sidebar from "../components/Sidebar";
import Main from "../components/Main";


const Home = ( {isOpen }) => {


  return (
    <div className="home">
      <Sidebar isOpen={isOpen} />
      <Main />
    </div>
  );
};

export default Home;
