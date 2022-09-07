import "./css/Main.css"
import React, { useCallback, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import Hoc from "../HOC/auth"
import { useDispatch } from "react-redux"
import { userLogout } from "../actions/userLogout"

const Main = () => {
    const { loading, user, error } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        console.log(user);
    }, [])

    const handleLogout = e => {
        e.preventDefault();
        dispatch(userLogout()).then(
            () => {
                alert("로그아웃 완료!");
                window.location.reload()
            }
        ).catch(e => {
            alert("알 수 없는 에러")
        }) 
    }

    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center'}}>
            <br></br>
            <br></br><br></br>
            <h1 style={{color:"rebeccapurple", fontSize:'50px'}}>BibleT</h1>
            <br></br>
            <div>
            <span>{user ? user.username + "님" : "로그인하세요"}</span><span onClick={user ? handleLogout : () => navigate("/login")} style={{fontSize:'13px', color:'gray', marginLeft:'5px'}}>{user ? '로그아웃' : '로그인'}</span>
            </div>
            <br></br><br></br><br></br><br></br>
            <div style={{maxWidth:'50%', display:'inline-flex', justifyContent:'center', alignItems:'center'}}>
                <div onClick={()=> navigate('/userProfile')} style={{margin:'5px', borderRadius:"15%", display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'gainsboro', minWidth:"150px", height:'150px'}}>
                    <img style={{width:'60px'}} src={"./png/train.png"}></img>
                    <h2 style={{fontSize:'20px'}}>내 성경열차</h2>
                </div>
                <div style={{margin:'5px', borderRadius:"15%", display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'gainsboro', minWidth:"150px", height:'150px'}}>
                    <img style={{width:'60px'}} src={"./png/bible.png"}></img>
                    <h2 style={{fontSize:'20px'}}>성경읽기 기록</h2>
                </div>
            </div>
        </div>
    )
}

export default Hoc(Main, true)