import React, { useEffect, useState } from "react";
import "./css/Logout.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { userLogout } from "../actions/userLogout";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../actions/userAuth";
import axios from "axios";
import Hoc from "../HOC/auth";
import PopUpTest from "./PopUpTest";

const UserProfile = () => {

    const dispatch = useDispatch();
    const [trainProfiles, setTrainProfiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.post("/api/train/trainProfiles").then(({data}) => {
            setTrainProfiles(prev => {
                console.log([...prev, ...data])
                return [...prev, ...data]
            });
        })
    }, []);

    const { loading, user, error } = useSelector((state) => state.user)

    const handleLogout = e => {
        e.preventDefault();
        dispatch(userLogout()).then(
            () => {
                navigate('/')
            }
        ).catch(e => {
            alert("알 수 없는 에러")
        }) 
    }

    const role = {
        ROLE_CAPTAIN : "🧑‍✈️",
        ROLE_CREW : "🧑‍🏭",
        ROLE_VIEWER : "viewer"
    }

    const menuList = trainProfiles.map((menu, index) => (
    <div key={menu.train.id} style={{backgroundColor:'ghostwhite', padding:"10px", width:'200px', margin:'30px', borderRadius:'5%', cursor:"pointer"}}
        onClick={() => {
            navigate(`/train/${menu.train.id}`);
        }}>
        <h3>{menu.train.trainName}</h3>
        <p>{menu.nickName} {role[menu.role]}</p>
        <p>정원 : {menu.train.memberCount}</p>
    </div>
    ))

    return (
        < >
        <PopUpTest />
        <div className="logout">
            <h1>
                <span className="user__name">{user&& user.username}</span>
                <span>님</span>
                <span>어서오세요</span>
            </h1>
            <button className="logout__button" onClick={handleLogout}>LOGOUT</button>
            <div>
            {
                menuList
            }
            </div>
            <div>
            <button 
            onClick={() => {
                navigate("/createTrain")
            }}
            style={{border:0, width:'130px', height:'30px', backgroundColor:'black', color:'white', borderRadius:'5px', marginInline:'5px'}}>성경 열차 가입하기</button>
            <button 
                onClick={() => {
                    navigate("/createTrain");
                }} style={{border:0, width:'130px', height:'30px', backgroundColor:'black', color:'white', borderRadius:'5px',marginInline:'5px'}}>성경 열차 만들기</button>
            </div>
        </div></>
    )
}

export default Hoc(UserProfile)