import React, { Component, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authenticateApi } from "../api/user";
import { userState } from "../store/UserStore";

export default function Hoc(HocComponent, canPass = false) {
  return function AUTH() {
    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
      (async () => {
        try {
          const data = await authenticateApi();
          setUser(data.user);
        } catch (e) {
          if (!canPass) {
            alert("로그인 해야합니다");
            setUser(null);
            navigate("/login", {
              state: {
                wait: location.pathname + location.search,
                back: "/",
              },
            });
          }
        }
      })();
    }, []);

    return <HocComponent />;
  };
}
