import { MDBBtn } from "mdb-react-ui-kit";
import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          height: "60%",
          backgroundColor: "#EEEEEE",
          borderRadius: "20px",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "150px", textAlign: "center" }}>404</div>
          <div style={{ fontSize: "40px", textAlign: "center" }}>
            Page Not Found!
          </div>
          <div className="m-4 ">
            <MDBBtn style={{ fontSize: "16px" }} href="/">
              Go Back 👈🏻
            </MDBBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
