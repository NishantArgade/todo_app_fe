import { useContext, useState } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Context, server_url } from "../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviagte = useNavigate();
  const { isAuthenticated, setIsAuthenticated, loading, setLoading, setUser } =
    useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(name, email, password);
    try {
      const { data } = await axios.post(
        `${server_url}/user/register`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
      setUser({ name, email });
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      toast.error(error.response.data.error);
      setLoading(false);
    }
  };

  // if (!isAuthenticated) {
  //   return <></>;
  // }
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <h1 className="text-center">Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <MDBInput
          wrapperClass="mb-4"
          label="Name"
          id="form1"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <MDBBtn className="mb-4" type="submit" disabled={loading}>
          Register
        </MDBBtn>
      </form>
      <div className="text-center">
        <p>
          Alredy Register? <a href="/login">Login</a>
        </p>
        <p>Sign up with :</p>

        <div
          className="d-flex justify-content-between mx-auto"
          style={{ width: "40%" }}
        >
          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="facebook-f" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="twitter" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="google" size="sm" />
          </MDBBtn>

          <MDBBtn
            tag="a"
            color="none"
            className="m-1"
            style={{ color: "#1266f1" }}
          >
            <MDBIcon fab icon="github" size="sm" />
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
}

export default Register;
