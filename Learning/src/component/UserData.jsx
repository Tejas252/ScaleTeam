import React, { useState } from 'react'
import { UserModal } from './modal/UserModal'
import { toast } from 'react-toastify'

export const UserData = ({firstName,secondName,email,birthDate,country,hobby,address,gender,phone,onUserUpdate,users,type}) => {
    // const  = props
    const [modal,setModal] = useState(false)
    const toggle = () => setModal((modal) => (!modal))
    const toggleConfirm = (email) => {
        const answer = confirm("Are You sure?")
        if(answer){
            const updateList = users.filter((val,i) => (val.email !== email))
            localStorage.setItem("Users",JSON.stringify(updateList))
            toast.success('Successfully deleted')
            onUserUpdate(updateList)
        }
    }
    

  return (
    <>
        <tr>
            <th scope="row">{email}</th>
            <td>{firstName}</td>
            <td>{secondName}</td>
            <td>{gender}</td>
            <td>{birthDate}</td>
            <td>{country}</td>
            <td>{type}</td>
            <td>{hobby.map((val) => (<pre>{val}</pre>))}</td>
            {/* <td>{JSON.stringify(hobby)}</td> */}
            <td>{phone}</td>
            <td>{address}</td>
            <th><img  onClick={toggle} style={{height:"20px",width:"20px",cursor:"pointer"}} src="./src/component/image/edit.svg"></img></th>
            <th><img  onClick={() => (toggleConfirm(email))} style={{height:"20px",width:"20px",cursor:"pointer"}} src="./src/component/image/trash.svg"></img></th>
        </tr>
        <UserModal onUserUpdate={onUserUpdate} isOpen={modal} toggle={toggle} email={email}/>
    </>
  )
}
