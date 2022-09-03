import "./css/Login.css"
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom";
import { userRegister } from "../actions/userRegister";

export const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const submit =(e) => {
        e.preventDefault();
        dispatch(userRegister({
            username:name,
            password:password,
        })).then(response => {
            if(response.payload.success) {
                alert("회원가입에 성공하였습니다.")
                navigate('/login');
            } else {
                alert("회원가입에 실패하였습니다.")
                navigate('/register')
            }
        })
    }

    return (
        <div>
            <form className="login__form" onSubmit={(e) => submit(e)}>
                <h1>Register To DH</h1>
                <input type="name" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)} ></input>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button className="submit__btn">submit</button>
            </form>
        </div>
    )
}