import React from "react";
import "./css/app.css";
import { Login } from "./page/Login/Login";
import BibleTrainProfiles from "./page/Profiles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./page/Register/Register";
import Main from "./page/Main";
import CreateTrain from "./page/Profiles/CreateTrain";
import JoinTrain from "./page/JoinTrain/JoinTrain";
import ProfileDetail from "./page/ProfileDetail/ProfileDetail";
import BibleTrain from "./page/BibleTrain/BibleTrain";

function App() {
  return (
    <div className="App">
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
