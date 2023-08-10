// React Hookes 
import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import "./css/Login.css"

// ThirdParty Imports 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Navigate } from 'react-router-dom';



export const Login = () => {

    // States 
    const [userDetails ,setUserDetails] = useState({})
    const navigate = useNavigate()
    // const [details , setDetails] = useState([]);

    // Function 
    const handleClick = (e) =>
    {
        e.preventDefault()
        if(userDetails?.email && userDetails?.password)
        {

            const localStorageData = JSON.parse(localStorage.getItem("Users"))
            if(localStorageData?.length){
                const isVaild = localStorageData.filter((val,i) => (val.email === userDetails.email && val.password === userDetails.password))
                if(isVaild.length){
                    localStorage.setItem("Token",userDetails.email)
                    toast.success('vaild')
                    navigate("/")
                }else{
                    toast.error('Email & Password not vaild')
                }
            }else{
                // <Navigate to="/Signup" replace/>
                toast.error('Register Please')
                navigate("/Signup")
            }

        }else{

            toast.error('Input All Details');
        }

    }
      // regex dec 
    const regexPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    const regexEmail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;   

  return (
    <>

    {/* Login Form  */}  
    <div className='container'>
        <h1 className='from-heading'>Login</h1>
        <Form onSubmit={handleClick}>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4 ">
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" type="text" invalid={(userDetails?.email && !regexEmail.test(userDetails?.email))} placeholder='Email'  value={userDetails?.email || ""} onChange={(e) => setUserDetails((userDetails) => ({...userDetails,email:e.target.value}))}/> <br />
                            <span className='errorMsg'>{ 
                                    (!regexEmail.test(userDetails.email)) && (userDetails.email) &&
                                     ("Enter Vaild Email")
                                }</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input id="password" type="password" invalid={(userDetails?.password && !regexPassword.test(userDetails.password))} placeholder='Password' value={userDetails?.password || ""}   onChange={(e) => (setUserDetails((userDetails) => ({...userDetails,password:e.target.value})))}/>
                            <span className='errorMsg'>{ 
                                    (!regexPassword.test(userDetails.password)) && (userDetails.password) &&
                                     ("Must Contain 8 combination of a-Z 1-9 @_")
                            }</span>
                        </FormGroup>
                        <Link to="/Signup">Not Register?</Link>
                        <Button className="button"  color="primary">Login</Button>
                    </div>
                    <div className="col-4"></div>
                </div>
                    
        </Form>
    </div>
    </>
  )
}
