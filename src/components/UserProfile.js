import React, { useEffect, useState } from "react";
import "./css/Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { userLogout } from "../actions/userLogout";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../actions/userAuth";
import axios from "axios";
import Hoc from "../HOC/auth";
import HeaderWithBack from "./HeaderWithBack";

const UserProfile = () => {
    const dispatch = useDispatch();
    const [trainProfiles, setTrainProfiles] = useState([]);
    const { loading, user, error } = useSelector((state) => state.user)
    const navigate = useNavigate();

    useEffect(() => {
        axios.post("/api/train/trainProfiles").then(({data}) => {
            setTrainProfiles(prev => {
                console.log([...prev, ...data])
                return [...prev, ...data]
            });
        })
    }, []);

    const role = {
        ROLE_CAPTAIN : "🧑‍✈️",
        ROLE_CREW : "🧑‍🏭",
        ROLE_VIEWER : "뷰어"
    }

    const menuList = trainProfiles.map((menu, index) => {
        console.log(menu);
    return (
    <div key={menu.train.id} style={{backgroundColor:'whitesmoke', padding:"10px", width:'250px', height:'90px', margin:'30px', borderRadius:'5%', cursor:"pointer"}}
        onClick={() => {
            navigate(`/train/${menu.train.id}`);
        }}>
        <h3>{menu.train.trainName}</h3>
        <p>{menu.nickName} {role[menu.role]}</p>
        <span>정원 : {menu.train.memberCount}</span>
        <span style={{marginLeft:'10px', fontSize:'15px'}}>트랙 : {menu.train.trackAmount}개</span>
    </div>
    )})

    return (
        user && <>
        <HeaderWithBack title={`${user.username}님의 기차들`} subtitle={`기차 수 : ${trainProfiles && trainProfiles.length}개`} />
        <div className="profiles">
            <div>
            {
                menuList
            }
            </div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', position:'fixed',bottom:0, width:'100%', height:'100px'}}>
            <button
                onClick={() => {
                    navigate("/createTrain")
                }} style={{border:0, width:'230px', height:'50px', backgroundColor:'black', color:'white', borderRadius:'5px',marginInline:'5px'}}>성경 열차 만들기</button>
            </div>
        </div>
        </>
    )
}

export default Hoc(UserProfile, false)