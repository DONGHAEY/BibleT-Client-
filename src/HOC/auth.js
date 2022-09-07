import React, {Component, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { userAuth } from '../actions/userAuth';

export default function Hoc(HocComponent, canPass=false){
    return function AUTH() {

        const dispatch = useDispatch();
        const navigate = useNavigate();
        const location = useLocation();

        useEffect(() => {
          dispatch(userAuth()).then(response => {
              if(response.payload && !response.payload.success) {
                if(canPass) return <HocComponent />
                alert("로그인이 필요한 작업입니다");
                navigate('/login',
                {
                  state:{
                    wait: location.pathname + location.search
                  }
                });
            }
          })
        }, [])
      
            return (
                <HocComponent />
            );
        }
    } 
