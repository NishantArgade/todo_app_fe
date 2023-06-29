import { useContext, useState } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Context, server_url } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading, setUser } =
    useContext(Context);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(email, password);
    try {
      const { data } = await axios.post(
        `${server_url}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
      toast.success(data.message);
      setLoading(false);
      setUser({ name: email });
      navigate("/");
    } catch (error) {
      setIsAuthenticated(false);
      toast.error(error.response.data.error);
      setLoading(false);
      console.log(error);
    }
  };
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  // if (loading) {
  //   return <Loader />;
  // }
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <h1 className="text-center">Login</h1>
      <form onSubmit={submitHandler}>
        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="form1"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="form2"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="text-center">
          <MDBBtn className="mb-4" type="submit" disabled={loading}>
            Sign in
          </MDBBtn>
        </div>
      </form>

      <div className="text-center">
        <p>
          Not a member? <a href="/register">Register</a>
        </p>
      </div>
    </MDBContainer>
  );
}

export default Login;
