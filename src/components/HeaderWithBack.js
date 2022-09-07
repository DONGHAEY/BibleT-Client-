import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { faBars, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { TiArrowBack } from '@react-icons/all-files/ti/TiArrowBack'
import { useNavigate } from "react-router-dom";

export default function HeaderWithBack({title, subtitle, path, right}) {
    const navigate = useNavigate();
    return (
      <Header>
        <div style={{width:'20%'}}>
          <TiArrowBack style={{color:'black', marginLeft:'30px', fontSize:'30px'}} onClick={() => navigate(path || '/' )} />
        </div>
        <div style={{textAlign:'center', color:'black'}}><h2>{title}</h2><p>{subtitle}</p></div>
          <div div style={{width:'20%'}}>
            {
              right && right
            }
          </div>
      </Header>
    );
}

const Header = styled.div`
  max-width: 100%;
  height:90px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: gray;
  background-color: rgb(253, 253, 253);
`;