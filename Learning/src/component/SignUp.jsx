// React Hookes 
import React, { useEffect, useState, } from 'react'
import { Button, Form, FormGroup, Label, Input,   } from 'reactstrap';
import "./css/Login.css"

// ThirdParty Imports 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link ,useNavigate} from 'react-router-dom';

export const SignUp = () => {
    
    // regex dec 
    const regexPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    const regexEmail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    const regexPhone = /^[0-9]{10}$/
    
    const fakeData = { address: "Velenja", age: 13, birthDate: "2009-12-12", email: "savaliyatejas10@gmail.com", firstName: "tejas", gender: "male", hobby: ["coding"], image: {}, password: "123456", phoneNumber: "+919979328599", secondName: "Mukeshbhai" }
    // localStorage.setItem()
    // States 
    const [userDetails, setUserDetails] = useState({ hobby: [] ,country:'india',type:"admin"})
    const [details, setDetails] = useState([]);
    const [image, setImage] = useState();

    // Navigates 

    const navigate = useNavigate()
    // effects when details update
    useEffect(() => {
        if(localStorage?.getItem("Token"))
        {
           localStorage.setItem("Token","")
        }
        if(details?.length){
            localStorage.setItem("Users", JSON.stringify(details))
        if(JSON.parse(localStorage.getItem("Users")).length){
            toast.success("Sign Up Completed")
            console.log()
            navigate('/Login')
        }}
    }, [details])

    const handleClick = (e) => {
        console.log(e)
        e.preventDefault()
        if (userDetails?.firstName && userDetails?.email && userDetails?.gender && userDetails?.image && userDetails?.secondName && userDetails?.phoneNumber && userDetails?.country && userDetails?.hobby && userDetails?.address && userDetails?.password && userDetails?.birthDate) {
            var localStorageData = JSON.parse(localStorage.getItem("Users"))
            if (localStorageData?.length) {
                // var sameData = false
                const sameData = localStorageData.filter((val, i) => (val.email === userDetails.email))
                if (sameData.length) {
                    console.log(userDetails)
                    toast.error("Same Data")
                    //  setIsAlready(true)
                } else if(regexPhone.test(userDetails.phoneNumber) && regexPassword.test(userDetails.password) && regexEmail.test(userDetails?.email)   ){
                    setDetails((details) => ([...JSON.parse(localStorage?.getItem("Users")),userDetails]))
                    setUserDetails({  hobby: [] ,country:'india',type:"admin"})
                    setImage('')
                                       
                }else{
                    !regexPhone.test(userDetails.phoneNumber) ? toast.error('Input Correct Phone-Number'):
                    !regexPassword.test(userDetails.password) ? toast.error('Input Correct Formated Password'):
                     toast.error('Input Correct Formated Email')
                }
            } else {
                if(regexPhone.test(userDetails.phoneNumber) && regexPassword.test(userDetails.password) && regexEmail.test(userDetails?.email)){
                    setDetails((details) => ([ ...JSON.parse(localStorage?.getItem("Users")),userDetails]))
                    setUserDetails({  hobby: [] ,country:'india',type:"admin"})
                    setImage('')
                    

                }else{
                    !regexPhone.test(userDetails.phoneNumber) ? toast.error('Input Correct Phone-Number'):
                    !regexPassword.test(userDetails.password) ? toast.error('Input Correct Formated Password'):
                     toast.error('Input Correct Formated Email')
                }
            }
            

            // const defaultData = { gender: userDetails.gender, hobby: [...userDetails.hobby], image: userDetails.image }
            

            // console.log(userDetails)
            //  setChecked(false)
        } else {

            toast.error('Input All Details');
        }
    }
    
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

    const handleHobby = (e) =>{
        
    }
    return (
        <>

            {/* Login Form  */}
            <div className='container'>
                <h1 className='from-heading'>Signup</h1>
                <Form onSubmit={handleClick}>
                    <div className="row">
                            <FormGroup>
                                <Label>Type Of Account</Label>
                                <Input bsSize="lg" className="mb-3" type="select" value={userDetails?.type} onChange={(e) => (setUserDetails((userDetails) => ({...userDetails,type:e.target.value})))}>
                                        <option value="Admin">Admin</option>
                                        <option value="Member">Member</option>
                                        <option value="User">User</option>
                                </Input>
                            </FormGroup>
                        <div className="col-2"></div>
                        <div className="col-4">
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
                                        <Input type="radio" name="radio1" value="male" />{' '}
                                        Male
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="radio1" value="female" />{' '}
                                        Female
                                    </Label>
                                </FormGroup>
                                <FormGroup check >
                                    <Label check>
                                        <Input type="radio" name="radio1" value="other" />{' '}
                                        Other
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">Address</Label>
                                <Input type="textarea" name="text" id="exampleText" value={userDetails?.address || ""} onChange={(e) => (setUserDetails((userDetails) => ({ ...userDetails, address: e.target.value })))} />
                            </FormGroup> <br />
                            <Link to="/Login">Login Here</Link>
                        </div>
                        <div className="col-4 ">
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input id="email" type="text" placeholder='Email' invalid={(userDetails?.email && !regexEmail.test(userDetails?.email))} value={userDetails?.email || ""} onChange={(e) => setUserDetails((userDetails) => ({ ...userDetails, email: e.target.value }))} />
                                <span className='errorMsg'>{ 
                                    (!regexEmail.test(userDetails.email)) && (userDetails.email) &&
                                     ("Enter Vaild Email")
                                }</span>
                            </FormGroup>
                            <FormGroup>
                                <Label for="userName">Password</Label>
                                <Input id="userName" type="password" invalid={(userDetails?.password && !regexPassword.test(userDetails.password))} placeholder='password' value={userDetails?.password || ""} onChange={(e) => (setUserDetails((userDetails) => ({ ...userDetails, password: e.target.value })))} />
                                 <span className='errorMsg'>{ 
                                    (!regexPassword.test(userDetails.password)) && (userDetails.password) &&
                                     ("Must Contain 8 combination of a-Z 1-9 @_")
                                }</span>
                            </FormGroup>
                            <FormGroup >
                                <Label for="age">Age</Label>
                                <Input id="age" type="text" placeholder='Age' value={userDetails.age } readOnly />
                            </FormGroup>
                            <FormGroup>
                                <Label for="phoneNumber">PhoneNumber</Label>
                                <Input id="phoneNumber" type="text" placeholder='Phone' value={userDetails?.phoneNumber || ""} onChange={(e) => setUserDetails((userDetails) => ({ ...userDetails, phoneNumber: e.target.value }))} />
                                <span className='errorMsg'>{ 
                                    (!regexPhone.test(userDetails.phoneNumber)) && (userDetails.phoneNumber) &&
                                     ("Must Contain 10 Digits")
                                }</span>
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
                            <FormGroup>
                                            
                                        <Label for="exampleFile">File</Label>
                                        <Input type="file" name="file" id="exampleFile" accept="image/*" onChange={(e) => (handleFileRead(e))} />
                                    
                                {image && 
                                    <>
                                        <br />
                                        <output>
                                            <img src={image}></img>
                                            {/* <span onClick={handlePhotoClose} className='mx-1 cross'> X </span> */}
                                        </output>
                                    </>
                                }
                                
                            </FormGroup>

                            <Button className=" " color="primary">Sign Up</Button>
                        </div>
                        <div className="col-2"></div>
                    </div>

                </Form>
            </div>
        </>
    )
}
