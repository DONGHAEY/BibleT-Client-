import React, { useState } from "react";
import styled from "styled-components";
import "./css/header.css";
import { TiArrowBack } from "@react-icons/all-files/ti/TiArrowBack";
import { useNavigate } from "react-router-dom";

export default function HeaderWithBack({ title, subtitle, path = "/", right }) {
  const navigate = useNavigate();
  return (
    <Header>
      <ArrowBack>
        <TiArrowBack
          style={{ marginLeft: "30px" }}
          onClick={() => navigate(path)}
        />
      </ArrowBack>
      {title && subtitle && (
        <SubTitle>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </SubTitle>
      )}
      <Right show={right}>{right}</Right>
    </Header>
  );
}

const Header = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  position: fixed;
  top: 0px;
  z-index: 100;
  background-color: white;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  color: gray;
  background-color: rgb(253, 253, 253);
`;

const Right = styled.div`
  width: 15%;
  visibility: (${({ show }) => (show ? "visible" : "hidden")});
`;

const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
`;

const ArrowBack = styled.div`
  color: black;
  font-size: 30px;
  width: 15%;
`;
