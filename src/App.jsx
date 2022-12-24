import React, { useEffect } from "react";
import { Login } from "./page/Login";
import BibleTrainProfiles from "./page/BibleTrainProfiles";
import { useSelector } from "react-redux";
import TrainInfo from "./page/trainInfo";
import { selectUser } from "./features/userSlice";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Register } from "./page/Register";
import Main from "./page/Main";
import CreateTrain from "./page/CreateTrain";
import JoinTrain from "./page/trainInfo/JoinTrain";
import ProfileDetail from "./page/trainInfo/ProfileDetail";
import TrackDetail from "./page/trainInfo/TrackDetail";

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
            <Route path=":trainId/" element={<TrainInfo />}></Route>
            <Route
              path=":trainId/trackDetail/:trackDate"
              element={<TrackDetail />}
            ></Route>
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
