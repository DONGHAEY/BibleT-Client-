import "./css/Main.css"
import React, { useCallback, useState } from "react"
import Header from "./Header"
import PopUpTest from "./PopUpTest"

export const Main = () => {
    
    return (
        <>
            <PopUpTest />
            <div>
                <h1>성경열차</h1>
            </div>
        </>
    )
}