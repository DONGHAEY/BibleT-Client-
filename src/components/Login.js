import "./css/Login.css"
import { useDispatch, useSelector } from "react-redux";
import {userLogin} from "../actions/userLogin"
import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { loading, user, error } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const submit =(e) => {
        e.preventDefault();
        dispatch(userLogin({
            username:name,
            password:password,
        })).then(response => {
            if(response.payload.success) {
                navigate("/userProfile");
            } else {
                alert("유저네임이 올바르지 않거나 비밀번호가 올바르지 않습니다")
            }
        })
    }

    return (
        <div>
            <form className="login__form" onSubmit={(e) => submit(e)}>
                <h1>Login To DH</h1>
                <input type="name" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)} ></input>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button className="submit__btn">submit</button>
            </form>
        </div>
    )
}