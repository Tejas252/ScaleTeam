import { useState } from 'react'
import { Login } from './component/Login'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SignUp } from './component/SignUp'
import { NotFound } from './component/NotFound'
import {User} from './component/Accounts/User'
import {Member} from './component/Accounts/Member'
import {Admin} from './component/Accounts/Admin'
import { Home } from './component/Home'
import { PrivateRouting } from './PrivateRoutes/PrivateRouting'
import { UserData } from './component/UserData'
import { Tabing } from './Tabing/Tabing'
import { DataList } from './API/DataList'
// import './App.css'

function App() {
  const [users,setUsers] = useState(JSON.parse(localStorage.getItem("Users"))) 

  function updateUsers(details){
    setUsers(details)
  }
// const isAuthenticated = localStorage?.getItem("Token")
  return (
    <>

        <BrowserRouter>
          <Routes>
            <Route  path="/" element={<PrivateRouting component={Login} onUpdateUsers={updateUsers} path="/"/>}>
                <Route path='' element={<User users={users}  onUpdateUsers={updateUsers}/>}/>  
                <Route path='User' element={<User users={users}  onUpdateUsers={updateUsers}/>}/>  
                <Route path='Member' element={<Member users={users}  onUpdateUsers={updateUsers}/>}/>  
                <Route path='Admin' element={<Admin users={users}  onUpdateUsers={updateUsers}/>}/>  
            </Route>
            <Route  path="/Signup" element={<PrivateRouting component={SignUp} />}/>
            <Route  path="/Login" element={<PrivateRouting component={Login} path="/"/>}/>
            <Route path="/Tabing" element={<Tabing/>}/>
            <Route path='/DataList'element={<DataList/>}/>
            <Route  path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
        {/* <Home/> */}

        {/* <Login/> */}
    </>
  )
}

export default App
