import "./css/Login.css"
import { useDispatch } from "react-redux";
import {userLogin} from "../features/userSlice";
import React, { useCallback, useState } from "react"

export const Login = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit =(e) => {
        e.preventDefault();
        dispatch(userLogin({
            username:name,
            password:password,
        }));

    }

    return (
        <div>
            <form className="login__form" onSubmit={(e) => submit(e)}>
                <h1>Login To DH</h1>
                <input type="name" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)} ></input>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button className="submit__btn">submit</button>
            </form>
        </div>
    )
}