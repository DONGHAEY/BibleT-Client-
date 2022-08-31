import './App.css';
import React, { useCallback, useEffect } from 'react';
import {Login} from './components/Login';
import {UserProfile} from './components/UserProfile';
import { useSelector } from 'react-redux';
import { TrainInfo } from './components/trainInfo';
import { selectUser } from './features/userSlice';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Register } from './components/Register';
import { Main } from './components/Main';


function App() {

  const user = useSelector((state) => state.user);

  return (
      
      <Router>
            <div>
      <>
      <Link to="/">
        <button>메인 화면으로</button>
      </Link>
      <Link to="/login">
        <button>로그인 화면으로</button>
      </Link>
      <Link to="/register">
        <button>회원가입</button>
      </Link>
      <Link to="/userProfile">
        <button>유저정보</button>
      </Link>
    </>
        <Routes>
          <Route exact path="/" element={ <Main /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/userProfile" element={ (<UserProfile />)} />
          <Route path="/train/:trainId" element={ (<TrainInfo />)} />
        </Routes>
        </div>
      </Router>
  );
}

export default App;
