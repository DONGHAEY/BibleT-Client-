import React from "react";
import "./css/Logout.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export const Logout = () => {

    const dispatch = useDispatch();

    const user = useSelector(selectUser);

    const handleLogout = e => {
        e.preventDefault();
        // dispatch(logout());
    }
    console.log(user);

    return (
        <div className="logout">
            <h1>
                Welcome <span className="user__name">{user.username}</span>
            </h1>
            <button className="logout__button" onClick={handleLogout}>LOGOUT</button>
        </div>
    )
}