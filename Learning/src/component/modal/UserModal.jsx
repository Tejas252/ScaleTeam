import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

export const UserModal = (props) => {

    // States 
    const [userDetails, setUserDetails] = useState({ hobby: [] ,country:'india'})
    const [details, setDetails] = useState([]);
    const [image, setImage] = useState();

    // Destructing Props 
    const {isOpen,toggle,email,onUserUpdate} = props

        // regex dec 
        const regexPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
        const regexEmail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

        // get Data form localStorage 

      useEffect(() => {
        var localStorageData = JSON.parse(localStorage?.getItem("Users"))
        const user = localStorageData.filter((val) => (val.email === email))
        setUserDetails(user[0])
        //   setUserDetails((userDetails) => ({...UserData,localStorageData[0]}))

      },[])

         //   Image ONload Function 
    const convertBase64 = (file) => {
        const imgData = URL.createObjectURL(file)
        setUserDetails((userDetails) => ({ ...userDetails, image: imgData }))
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                setImage(URL.createObjectURL(file))
                resolve(fileReader.result);

            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    //   convertBase64.then(){(img) => 
    //   }

    const handleFileRead = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        console.log(base64)
    }

    //   Photo Close 

    const handlePhotoClose = (e) => {
        setImage('')
    }


    // Data Changer 

    const handleClick = (e) => {
        // console.log(e)
        // e.preventDefault()
        if (userDetails?.firstName && userDetails?.email && userDetails?.gender && userDetails?.image && userDetails?.secondName && userDetails?.phoneNumber && userDetails?.country && userDetails?.hobby && userDetails?.address && userDetails?.password && userDetails?.birthDate) {
            var localStorageData = JSON.parse(localStorage.getItem("Users"))
             if(regexPassword.test(userDetails.password) && regexEmail.test(userDetails?.email)   ){
                    // localStorage.getItem
                    const updatedData = localStorageData.map((val,i)=>((val.email === userDetails.email)?(userDetails):(val)))
                    localStorage.setItem("Users", JSON.stringify(updatedData))
                    toggle()
                    onUserUpdate(updatedData)
                    toast.success("Successfully Updated")
                    // console.log(updatedData)
                    // setDetails((details) => ([...details, userDetails]))
                    // setUserDetails({  hobby: [] ,country:'india'})
                    // setImage('')
                                       
                }else{
                    toast.error('Input Correct details')
                }
           
            
        } else {

            toast.error('Input All Details');
        }
    }

    // Age Calculator 
    function calculateAge(Birthdate) {
        var today = new Date();
        var BirthDate = new Date(Birthdate);
        var age = today.getFullYear() - BirthDate.getFullYear();
        var monthDiff = today.getMonth() - BirthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < BirthDate.getDate())) {
            age--;
        }

        return age;
    }

        
  return (
    <>
         <Modal isOpen={isOpen} toggle={toggle}>
         <ModalHeader toggle={toggle}>Modal title</ModalHeader>
         <ModalBody>
            <Form>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input id="email" type="text" placeholder='Email' invalid={(userDetails?.email && !regexEmail.test(userDetails?.email))} value={userDetails?.email || ""} onChange={(e) => setUserDetails((userDetails) => ({ ...userDetails, email: e.target.value }))} />
                                    <span className='errorMsg'>{ 
                                        (!regexEmail.test(userDetails.email)) && (userDetails.email) &&
                                        ("Enter Vaild Email")
                                    }</span>
                                </FormGroup>    
                                <FormGroup>
                                    <Label for="fristName">FirstName</Label>
                                    <Input id="fristName" type="text" placeholder='UserName' value={userDetails?.firstName || ""} onChange={(e) => (setUserDetails((userDetails) => ({ ...userDetails, firstName: e.target.value })))} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="secondName">SecondName</Label>
                                    <Input id="secondName" type="text" placeholder='SecondName' value={userDetails?.secondName || ""} onChange={(e) => setUserDetails((userDetails) => ({ ...userDetails, secondName: e.target.value }))} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="birthDate">BirthDate</Label>
                                    <Input id="birthDate" type="date" placeholder='Email' value={userDetails?.birthDate || ""} onChange={(e) => setUserDetails((userDetails) => ({ ...userDetails, birthDate: e.target.value.toString(), age: calculateAge(e.target.value) }))} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleSelect">Country</Label>
                                    <Input type="select" name="country" value={userDetails?.country || ""} id="exampleSelect" onChange={(e) => (setUserDetails((userDetails) => ({ ...userDetails, country: e.target.value })))}>
                                        <option>India</option>
                                        <option>Japan</option>
                                        <option>USA</option>
                                        <option>UAE</option>
                                        <option>UK</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup tag="fieldset" onChange={(e) => (setUserDetails((userDetails) => ({ ...userDetails, gender: e.target.value })))}>
                                    <Label>Gender</Label>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="radio1" value="male" checked={userDetails.gender === "male" && true}/>{' '}
                                            Male
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" name="radio1" value="female" checked={userDetails.gender === "female" && true}/>{' '}
                                            Female
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check >
                                        <Label check>
                                            <Input type="radio" name="radio1" value="other" checked={userDetails.gender === "other" && true}/>{' '}
                                            Other
                                        </Label>
                                    </FormGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleText">Address</Label>
                                    <Input type="textarea" name="text" id="exampleText" value={userDetails?.address || ""} onChange={(e) => (setUserDetails((userDetails) => ({ ...userDetails, address: e.target.value })))} />
                                </FormGroup> <br />
                                <FormGroup>
                                    <Label for="phoneNumber">PhoneNumber</Label>
                                    <Input id="phoneNumber" type="text" placeholder='Phone' value={userDetails?.phoneNumber || ""} onChange={(e) => setUserDetails((userDetails) => ({ ...userDetails, phoneNumber: e.target.value }))} />
                                </FormGroup>
                                <FormGroup >
                                    <Label >
                                        <Label> Hobby</Label> <br />
                                        <Input type="checkbox"
                                            id="Coding"
                                            checked={userDetails.hobby.length && userDetails.hobby.includes('coding')}
                                            onChange={(e) => (
                                                e.target.checked 
                                                ? setUserDetails((userDetails) => ({ ...userDetails, hobby: [...userDetails?.hobby, "coding"]  })) 
                                                : setUserDetails((userDetails) => ({ ...userDetails, hobby: userDetails.hobby.filter((val, i) => (val != "coding")) })))} />{' '}

                                        <Label for="Coding">Coding</Label>  <br />
                                        <Input type="checkbox" 
                                            checked={userDetails.hobby.length && userDetails.hobby.includes('playing')}
                                            onChange={
                                                    (e) => (e.target.checked 
                                                        ? setUserDetails((userDetails) => ({ ...userDetails, hobby: [...userDetails?.hobby, "playing"] })) 
                                                        : setUserDetails((userDetails) => ({ ...userDetails, hobby: userDetails.hobby.filter((val, i) => (val != "playing")) })))
                                                } />{' '}

                                        <Label>Play</Label>   <br />
                                        <Input type="checkbox"
                                            checked={userDetails.hobby.length && userDetails.hobby.includes('travelling')}
                                            onChange={(e) => (e.target.checked 
                                                            ? setUserDetails((userDetails) => ({ ...userDetails, hobby: [...userDetails?.hobby, "travelling"] })) 
                                                            : setUserDetails((userDetails) => ({ ...userDetails, hobby: userDetails.hobby.filter((val, i) => (val != "travelling")) })))} />{' '}
                                        <Label>Travelling</Label>
                                    </Label>
                                </FormGroup>

                                {/* <Button className=" " color="primary">Sign Up</Button> */}
                            

            </Form>
         </ModalBody>
         <ModalFooter>
           <Button color="primary" onClick={handleClick}>
            Update
           </Button>{' '}
           <Button color="secondary" onClick={toggle}>
             Cancel
           </Button>
         </ModalFooter>
       </Modal>
    </>
  )
}
