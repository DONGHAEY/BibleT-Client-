import "./css/Main.css"
import React, { useCallback, useState } from "react"
import Header from "./Header"

export const Main = () => {
    return (

        <div className="Main">
            <Header></Header>
            <h1>성경열차</h1>
        </div>
    )
}