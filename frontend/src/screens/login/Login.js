import React, { useState,useEffect } from 'react';
import { FormGroup, Input, Label, Button, Form } from 'reactstrap';
import '../../assets/css/common.css';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Logo from '../../components/Logo';
import { GoogleLogin } from '@react-oauth/google';
import { GetSignInApi } from '../../API/userApi';
import jwt_decode from 'jwt-decode';
import { useGoogleLogin } from '@react-oauth/google';
import { GetSignInWithGoogleData } from '../../API/userApi';
import { checkExistEmail } from '../../API/userApi';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
const Login = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
    setError(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (inputData.email.length === 0) {
      setError(true);
    }
    if (inputData.password.length === 0) {
      setError(true);
    } else {
      try {
        await GetSignInApi(inputData);
        const user = Cookies.get('currentUser');
        console.log(user);
        if (user) {
          setSuccess(true);
          // localStorage.setItem('userEmail', JSON.stringify(response?.data?.User._id));
          // const shooter = JSON.parse(localStorage.getItem('loginUser'));
          if (user.rollSelect==="Shooter") {
            navigate('/photographer-CalenderView/View');
          }
         else if (user.rollSelect==='Editor') {
            navigate('/Deliverables/Cinematography')
          }
          else {
            navigate('/MyProfile');
          }
        }
      } catch (error) {
        console.log(error);
        toast.error('Invalid Credentials');
      }
    }
  };
  const signup = () => {
    navigate('Signup');
  };
 
  const { email, password } = inputData;
const login =  useGoogleLogin({
  onSuccess: async(tokenResponse) =>{
   const res=await  axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
    headers:{
      "Authorization":`Bearer ${tokenResponse.access_token}`
    }
   })

   await checkExistEmail(res.data.email)
   
   if (res.status===200) {
    localStorage.setItem("signInWithGoogle",JSON.stringify(res))
      const response = JSON.parse(localStorage.getItem('res'));
      if (response?.data===null) {
        navigate("/signInWithGoogle")
      }
      else if (response?.data!==null) {
        // const response = JSON.parse(localStorage.getItem('res'));
        localStorage.setItem(
          'userEmail',
          JSON.stringify(response?.data?.User._id)
        );
        const shooter = JSON.parse(localStorage.getItem('loginUser'));
        if (shooter.data.User.rollSelect === 'Shooter') {
          navigate('/photographer-CalenderView/View');
        }   else if (shooter.data.User.rollSelect === 'Editor') {
          navigate('/MyProfile/Deliverables/Cinematography');
        } else if (shooter.data.User.rollSelect==="Manager") {
          
          navigate('/MyProfile');
        } 
      }
  }
  else if (!res) {
    navigate("/signInWithGoogle")
  }
  else{
   const response=JSON.parse(localStorage.getItem('res'))
    localStorage.setItem('userEmail', JSON.stringify(response?.data?.User._id));
    const shooter = JSON.parse(localStorage.getItem('loginUser'));
    if (shooter.data.User.rollSelect === 'Shooter') {
      navigate('/photographer-CalenderView/View');
    }  
    else if (shooter.data.User.rollSelect === 'Editor') {
       navigate('/MyProfile/Deliverables/Cinematography');
     }
  else  if(shooter.data.User.rollSelect === "Manager"){
      navigate('/MyProfile');
    }
    
  }
  },
  
});
  return (
    <>
      <div className="row" style={{ maxWidth: '100%' }}>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
          <div className="padding_left">
            <div style={{ marginTop: 70 }}>
              <Logo />
            </div>
            <h4 className="heading" style={{ marginTop: 50 }}>
              Welcome back
            </h4>
            <p className="subheading" style={{ marginTop: -5 }}>
              Welcome back! Please enter your details{' '}
            </p>
            <Form onSubmit={handleSubmitForm}>
              <p className="input_lbl" style={{ marginTop: 30 }}>
                Email
              </p>
              <div className="input_div" style={{ marginTop: -10 }}>
                <input
                  className={
                    error && email.length < 1
                      ? 'input_field border w-100 border-danger'
                      : 'input_field w-100'
                  }
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleOnChange}
                  value={email}
                  name="email"
                ></input>
              </div>
              <p className="input_lbl" style={{ marginTop: 20 }}>
                Password
              </p>
              <div
                className={
                  error ? 'input_div border border-danger' : 'input_div'
                }
                style={{ marginTop: -10 }}
              >
                <input
                  className={'input_field w-100'}
                  name="password"
                  type="password"
                  placeholder="**********"
                  onChange={handleOnChange}
                  value={password}
                ></input>
              </div>
              <div className="d-flex justify-content-between align-items-center full_view_login">
                {/* <FormGroup style={{ marginTop: 5 }}>
                  <Label>
                    <Input type="checkbox" /> &nbsp;Remember Password
                  </Label>
                </FormGroup> */}
                <button
                  className="transparent_btn"
                  onClick={() => navigate('/emailVerify')}
                >
                  Forgot Password
                </button>
              </div>
              <Button
                type="submit"
                className="submit_btn"
                style={{ marginTop: 10 }}

                // onClick={() => home()}
              >
                Sign In
              </Button>{' '}
            </Form>
            <br />
            <Button
              outline
              color="secondary"
              className="submit_btn"
              style={{ marginTop: 10 }}
              onClick={login}
            >
              <img
                src="/images/google.png"
                width={20}
                style={{ marginRight: 10, marginTop: -3 }}
                onClick={login}
              ></img>
              Sign in google
            </Button>
            {/* <GoogleLogin
              onSuccess={(credentialResponse) => {
               const decode=jwt_decode(credentialResponse.credential);
               console.log(decode,"decode")
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            /> */}
            
            <div className="d-flex align-items-center justify-content-center bottom_width mt-3">
              <p className="subheading">Don’t have an account?</p>
              <p
                className="transparent_btn"
                style={{
                  fontSize: 13,
                  marginTop: 0,
                  marginLeft: 5,
                  cursor: 'pointer',
                }}
                onClick={ signup}
              >
                Sign up
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 hide_img">
          <div className="input_banner_img" />
        </div>
      </div>
      {success && <ToastContainer />}
    </>
  );
};

export default Login;
