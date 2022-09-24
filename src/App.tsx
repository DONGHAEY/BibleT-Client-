import React from "react";
import { RecoilRoot } from "recoil";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from "./components/Main/main";
import { UserLogin } from "./components/userLogin/userLogin";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<UserLogin />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}

export default App;
