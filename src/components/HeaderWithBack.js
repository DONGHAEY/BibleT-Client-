import React, { useState } from "react";
import styled from "styled-components";
import "./css/header.css";
import { TiArrowBack } from "@react-icons/all-files/ti/TiArrowBack";
import { useNavigate } from "react-router-dom";

export default function HeaderWithBack({ title, subtitle, path = "/", right }) {
  const navigate = useNavigate();
  return (
    <div className="Header">
      <div style={{ width: "15%" }}>
        <TiArrowBack
          style={{ color: "black", marginLeft: "30px", fontSize: "30px" }}
          onClick={() => navigate(path)}
        />
      </div>
      {title && subtitle && (
        <div style={{ textAlign: "center", color: "black" }}>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      )}
      <Right show={right}>{right}</Right>
    </div>
  );
}

const Right = styled.div`
  width: 15%;
  visibility: (${({ show }) => (show ? "visible" : "hidden")});
`;
