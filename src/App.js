import './App.css';
import React from 'react';
import {Login} from './components/Login';
import UserProfile from './components/UserProfile';
import { useSelector } from 'react-redux';
import TrainInfo from './components/trainInfo';
import { selectUser } from './features/userSlice';
import ScrrenShot from './components/ScreenShot'


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Register } from './components/Register';
import Main from './components/Main';
import CreateTrain from './components/CreateTrain';
import JoinTrain from './components/JoinTrain';
import ProfileDetail from './components/ProfileDetail';
import TEST from './components/TEST';
import Analysis from './components/analysis';


function App() {
  const user = useSelector((state) => state.user);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={ <Main /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/userProfile" element={ (<UserProfile />)} />
          <Route path="/train/">
            <Route path=":trainId/" element={<TrainInfo />}></Route>
            <Route path=":trainId/:userId" element={<ProfileDetail />} />
          </Route>
          <Route path="/createTrain" element={ ((<CreateTrain />))} />
          <Route path="/joinTrain/:trainId" element={<JoinTrain/>} />
          {/* <Route path="/gh1" element={<ScrrenShot />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
