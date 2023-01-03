import React from "react";
import { Login } from "./page/Login";
import BibleTrainProfiles from "./page/BibleTrainProfiles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./page/Register";
import Main from "./page/Main";
import CreateTrain from "./page/CreateTrain";
import JoinTrain from "./page/JoinTrain";
import ProfileDetail from "./page/ProfileDetail";
import BibleTrain from "./page/BibleTrain";
import axios from "axios";
axios.defaults.baseURL = "http://211.216.92.115:3000";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/myBibleTrainProfiles"
            element={<BibleTrainProfiles />}
          />
          <Route path="/train/">
            <Route path=":trainId/" element={<BibleTrain />}></Route>
            <Route path=":trainId/:userId" element={<ProfileDetail />} />
          </Route>
          <Route path="/createTrain" element={<CreateTrain />} />
          <Route path="/joinTrain/:trainId" element={<JoinTrain />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
