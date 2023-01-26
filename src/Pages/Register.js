import React, { useEffect, useState } from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem
} from "mdb-react-ui-kit";
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../Redux/Features/authSlice';
import bg2 from '../Assets/memebg8.jpeg'

const  initialState = {
  email:"",
  password:"",
  firstName:"",
  lastName:"",
  confirmPassword:""
}
const Register = () => {

  const [formValue, setFormvalue] = useState(initialState)
  const {loading, error} = useSelector((state)=>({...state.auth}))
  const {email, password,firstname, lastName, confirmPassword} = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

useEffect(() => {
    error && toast.error(error);
  }, [error]);
  //handle submit
  const handleSubmit = (e) =>{
    e.preventDefault();
    
    if(password !== confirmPassword){
      return toast.error("Password does not matching ")
    }

    if(email && password ){
      console.log("hello");
      dispatch(register({formValue, navigate, toast}));
    }

  }     

  const onInput = (e)=>{
    const {name, value} = e.target;

    setFormvalue({...formValue, [name]: value});
  }

  return (
    <div className="homeBg" style={{width:"100%", height:"100vh",display:"flex", justifyContent:"center", alignItems:"center",background: `url(${bg2})`, backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
    <div
      style={{
        margin: "auto",
        padding: "15px",
        width: "100vw",
        height:"100vh",
        alignContent: "center",
        backgroundColor:"rgba(12, 12, 12, 0.827)",
        display:"flex", justifyContent:"center", alignItems:"center"
      }}
    >
      <MDBCard alignment="center" style={{width:"50%",paddingTop:"10px",backgroundColor:"black", boxShadow:"1.5px 1.5px 4px 0.2px grey"}}>
        <MDBIcon fas icon="user-circle" className="fa-2x"  style={{color:"yellow"}}/>
        <h5 style={{color:"white", marginTop:"4px"}}>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation  noValidate className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
          <MDBValidationItem  feedback='First name cannot be blank' invalid>
              <MDBInput
                label="First Name"
                type="text"
                name="firstName"
                value={firstname}
                required
                invalid
                onChange={onInput}
                contrast

              />
              </MDBValidationItem>
            </div>
            <div className="col-md-6">
          <MDBValidationItem  feedback='Last name cannot be blank' invalid>
              <MDBInput
                label="Last Name"
                type="text"
                name="lastName"
                value={lastName}
                required
                invalid
                onChange={onInput}
                contrast


              />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
          <MDBValidationItem  feedback='Email field cannot be blank' invalid>
              <MDBInput
                label="Email"
                type="email"
                name="email"
                value={email}
                required
                invalid
                onChange={onInput}
                contrast


              />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
            <MDBValidationItem  feedback='Password field cannot be blank' invalid>
              <MDBInput
                label="Password"
                type="password"
                name="password"
                required
                value={password}
                onChange={onInput}
                contrast

              />

              </MDBValidationItem>
            </div>
            <div className="col-md-12">
          <MDBValidationItem  feedback='Confirm Password' invalid>
              <MDBInput
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                required
                invalid
                onChange={onInput}
                contrast
              />
              </MDBValidationItem>
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" ,fontSize:"14px", backgroundColor:"yellow", color:"black", fontWeight:"bold", letterSpacing:"1px"}} className="mt-2"  type='submit'>
                {/* spinner */}
                {loading && (
                  <MDBSpinner size='sm' role="status" tag="span" className='me-2' />
                  )}
                  
                Sign in
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already have an account ? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
    </div>
  )
}

export default Register;