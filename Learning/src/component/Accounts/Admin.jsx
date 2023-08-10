import React, { useState } from 'react'
import { Table } from 'reactstrap'
import { UserData } from '../UserData'

export const Admin = ({users,onUpdateUsers}) => {
  // function updateList(list){
  //   setUserList(list)
  // }
  // const [users,setUsers] = useState(JSON.parse(localStorage.getItem("Users"))) 
  const userList = users.map((val,i) => (val.type.toLowerCase() === "admin" &&
     <UserData  users={users} onUserUpdate={onUpdateUsers} key={val.email} firstName={val.firstName} secondName={val.secondName} email={val.email} phone={val.phoneNumber}  birthDate={val.birthDate} country={val.country} gender={val.gender} hobby={val.hobby} address={val.address}type={val.type}/>
     )) 
  return (
    <Table>
    <thead>
    <tr>
        {/* <th></th> */}
        <th>Email</th>
        <th>First Name</th>
        <th>Second Name</th>
        <th>Gender</th>
        <th>Birthdate</th>
        <th>Country</th>
        <th>Type</th>
        <th>Hobby</th>
        <th>Phone</th>
        <th>Address</th>
    </tr>
    </thead>
    <tbody>
        {userList}
    </tbody>
</Table>
  )
}
