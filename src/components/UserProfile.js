import React, { useEffect, useState } from "react";
import "./css/Logout.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { userLogout } from "../actions/userLogout";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../actions/userAuth";
import axios from "axios";

export const UserProfile = () => {

    const dispatch = useDispatch();
    const [trainProfiles, setTrainProfiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userAuth()).then(async response => {
            if(!response.payload.user) {
                alert("로그인이 되어있지않습니다")
                navigate("/login")
            } else {
                const { data } = await axios.post("/api/train/trainProfiles");
                setTrainProfiles(prev => {
                    console.log([...prev, ...data])
                    return [...prev, ...data]
                });
            }
        })
    }, []);

    const { loading, user, error } = useSelector((state) => state.user)

    const handleLogout = e => {
        e.preventDefault();
        dispatch(userLogout()).then(
            (response) => {
                navigate('/')
            }
        )
    }
    const role = {
        ROLE_CAPTAIN : "🧑‍✈️",
        ROLE_CREW : "🧑‍🏭",
        ROLE_VIEWER : "viewer"
    }

    const menuList = trainProfiles.map((menu, index) => (
    <div key={menu.train.id} style={{backgroundColor:'ghostwhite', padding:"10px", width:'200px', margin:'30px', borderRadius:'5%', cursor:"pointer"}}>
        <h3>{menu.train.trainName}</h3>
        <p>{menu.nickName} {role[menu.role]}</p>
        <p>정원 : {menu.train.memberCount}</p>
    </div>
    ))

    return (
        <div className="logout">
            <h1>
                Welcome <span className="user__name">{user&& user.username}</span>
            </h1>
            <button className="logout__button" onClick={handleLogout}>LOGOUT</button>
            <div>
            {
                menuList
            }
            </div>
        </div>
    )
}