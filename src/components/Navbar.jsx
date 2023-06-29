import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { useContext } from "react";
import { Context, server_url } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showBasic, setShowBasic] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server_url}/user/logout`, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      toast.success(data.message);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setIsAuthenticated(true);
      toast.error(error.response.data.error);
      setLoading(false);
      console.log(error);
    }
  };
  if (!isAuthenticated) return <div></div>;
  return (
    <MDBNavbar
      expand="lg"
      style={{
        height: "10vh",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <MDBContainer fluid>
        <MDBNavbarBrand href="/">😎</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0 ">
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="/">
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="#">About</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Tasks
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link href="/createTask">
                    Create
                  </MDBDropdownItem>
                  <MDBDropdownItem link>Option1</MDBDropdownItem>
                  <MDBDropdownItem link>Option2</MDBDropdownItem>
                  <MDBDropdownItem link>Option3</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <div className="d-flex input-group w-auto">
            {isAuthenticated ? (
              <MDBBtn
                rounded
                className="mx-2"
                color="secondary"
                onClick={handleLogout}
                disabled={loading}
              >
                Logout
              </MDBBtn>
            ) : (
              <MDBBtn rounded className="mx-2" color="secondary" href="/login">
                Login
              </MDBBtn>
            )}
          </div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
