import React, {Component, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { userAuth } from '../actions/userAuth';

export default function Hoc(HocComponent){
    return function AUTH() {

        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
          dispatch(userAuth()).then(response => {
            console.log(response);
            if(response.payload && !response.payload.success) {
              navigate('/login');
              alert("로그인하세요");
            }
          })
        }, [])
      
            return (
                <HocComponent />
            );
        }
    } 
