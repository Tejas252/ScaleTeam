import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Table,FormText ,Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText, } from 'reactstrap'
import { UserData } from './UserData'
import { AddUserModal } from './modal/AddUserModal'
var userList 
export const Home = ({onUpdateUsers}) => {

  const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("Token")
        navigate('/Login')
      } 


      const handleAddUser = () => {

      }

      // for AddUserModal 
      const [modal,setModal] = useState(false)
      const toggle = () => setModal((modal) => (!modal))
      // navigate('/User')
  return (

    <div>
        {/* <Link to="/SignUp" > Log-Out </Link> */}
                    {/* NavBar  */}
                  <AddUserModal onUpdateUsers={onUpdateUsers} isOpen={modal} toggle={toggle}/>
                  <Navbar>
                    <Nav pills tabs  >
                        <NavItem>
                          <NavLink><Link style={{color:"Black", textDecoration:'none'}} to="/User">User</Link></NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink><Link style={{color:"Black", textDecoration:'none'}} to="/Admin">Admin</Link></NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink><Link style={{color:"Black", textDecoration:'none'}} to="/Member">Member</Link></NavLink>
                        </NavItem>
                      </Nav>
                        <NavbarText>
                        </NavbarText>
                        <NavbarText className='d-flex'>
                          <NavLink style={{cursor:'pointer'}} onClick={handleLogout}>log-out</NavLink>
                          <NavLink className='btn btn-primary' style={{cursor:'pointer',color:"Black", textDecoration:'none'}} onClick={toggle}>Add</NavLink>
                        </NavbarText>
                   </Navbar>    
                   <Outlet/> 

    </div>
  )
}
