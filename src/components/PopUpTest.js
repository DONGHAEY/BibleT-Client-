import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple } from "@fortawesome/free-brands-svg-icons";
import { faBars, faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function PopUpTest(props) {
    const [isToggled, setIsToggled] = useState(false);
    const [userToggled, setUserToggled] = useState(false);
  
    return (
      <div>
        <Header isToggled={isToggled} userToggled={userToggled}>
        <div
          className="toggle"
          onClick={() => {
            setIsToggled(!isToggled);
          }}
        >
          <FontAwesomeIcon icon={!isToggled ? faBars : faTimes} />
        </div>

        <div className="logo">
          <Link to='/' style={{textDecoration:'none', color:'white'}}><h1 style={{fontSize:'25px'}}>BibleT</h1></Link>
        </div>

        <div
          className="user"
          onClick={() => {
            setUserToggled(!userToggled);
          }}
        >
          <FontAwesomeIcon icon={!userToggled ? faUser : faTimes} />
        </div>
  
        <ul className="header__menulist">
            <Link to='/' style={{textDecoration:'none', color:'white'}}><li>home</li></Link>
            <Link to='/userProfile' style={{textDecoration:'none', color:'white'}}><li>trainProfiles</li></Link>
        </ul>

        <ul className="header__right">
          <Link to='/login' style={{textDecoration:'none', color:'white'}}><li>Login</li></Link>
          <Link to='/register' style={{textDecoration:'none', color:'white'}}><li>Register</li></Link>
        </ul>
      </Header>
      </div>
    );
}

const Header = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: black;

  .logo {
    margin: 0 1rem;
    font-size: 2rem;
  }

  .header__menulist {
    display:flex;
    text-decoration: none;
    list-style: none;
    margin-left:30px;
  }

  .header__left {
    display: flex;
  }

  .header__right {
    list-style: none;
    display: flex;
    margin-left:30px;
  }

  .header__right div {
    margin: 0 1rem;
  }

  li {
    padding: 0 1rem;
  }

  .toggle {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  .user {
    display: none;
    font-size: 1.5rem;
    padding: 1rem 1rem;
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;

    .header__right {
      display: ${(props) => (props.userToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: black;
    }

    .header__menulist {
      display: ${(props) => (props.isToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      background-color: black;
    }

    .header__menulist li,
    .header__right li {
      margin: 1rem 0;
      padding: 0;
    }

    .toggle {
      display: block;
    }

    .user {
      display: block;
    }
  }
`;