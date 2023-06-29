import Navbar from "../components/Navbar";
import backgroundImage from "../assets/nature.jpg";
import { useCallback, useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const { user, loading, isAuthenticated } = useContext(Context);
  // const navigate = useNavigate();
  // if (!isAuthenticated) {
  //   return navigate("/login");
  // }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            width: "100vw",
            height: "90vh",
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1 className="text-center text-light">
            Weelcome to ToDo App ! {user?.name}
          </h1>
        </div>
      )}
    </>
  );
};

export default Home;
