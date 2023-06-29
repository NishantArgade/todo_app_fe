import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "60px",
        color: "white",
        background: "gray",
      }}
    >
      Loading...
    </div>
  );
};

export default Loader;
