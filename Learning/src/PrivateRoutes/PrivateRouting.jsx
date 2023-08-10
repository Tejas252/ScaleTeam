import React, { useEffect } from 'react'
import { Navigate, Route, useNavigate } from 'react-router-dom'
import { Login } from '../component/Login'
import { Home } from '../component/Home'

export const PrivateRouting = (props) => {

    const navigate = useNavigate()
    const {component:Component  , ...rest} = props
    const isAuthenticated = localStorage?.getItem("Token")

    // useEffect(() => {
        
    // },[isAuthenticated])
    return (
        <>
        {isAuthenticated?
            (<Home {...rest}/>):
            (<Component/>)
            }
               </>
  )
}
