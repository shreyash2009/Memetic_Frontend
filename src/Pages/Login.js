import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { googleSignIn, login } from "../Redux/Features/authSlice";
import { GoogleLogin } from "react-google-login";
import bg2 from '../Assets/memebg9.jpeg'


const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [formValue, setFormvalue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  const onInput = (e) => {
    const { name, value } = e.target;

    setFormvalue({ ...formValue, [name]: value });
  };


  const googleSuccess = (res)=>{ 
    const email = res?.profileObj?.email;
    const name = res?.profileObj?.name;
    const token = res?.tokenId;
    const googleId = res?.googleId;
    const result = {email, name, token, googleId}

    dispatch(googleSignIn({result, navigate, toast}))
  }
  const googleFailure = (err)=>{toast.error(err)}
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
      <MDBCard alignment="center" style={{backgroundColor:"black", boxShadow:"1.5px 1.5px 4px 0.2px grey", padding:"6px"}}>
        <MDBIcon fas icon="user-circle" className="fa-2x"  style={{color:"yellow"}}/>
        <h5 style={{color:"white"}}>Sign In</h5>
        <MDBCardBody>
          <MDBValidation noValidate className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-12">
              <MDBValidationItem feedback="Email field cannot be blank" invalid>
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
              <MDBValidationItem
                feedback="Password field cannot be blank"
                invalid
              >
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
            <div className="col-12">
              <MDBBtn style={{ width: "100%" , backgroundColor:"yellow", color:"black", fontWeight:"bold", letterSpacing:"1px"}} className="mt-2" type="submit">
                {/* spinner */}
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Sign in
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          <GoogleLogin
            clientId="858599962988-c8sjj4gfh48sugcvstv749b05gmu3o0s.apps.googleusercontent.com"
            render={(renderProps) => (
              <MDBBtn
                color="dark"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                style={{ width: "100%" , backgroundColor:"white", color:"black", fontWeight:"bold", letterSpacing:"1px"}}
              >
                <MDBIcon className="me-2" fab icon="google" />Sign In with Google
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account ? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
    </div>
  );
};

export default Login;
