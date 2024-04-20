import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'

const Register = () => {
   const [credentials, setCredentials] = useState({
      userName: undefined,
      email: undefined,
      password: undefined
   })

   const [emailError, setEmailError] = useState('');
   const [phoneError, setPhoneError] = useState('');
   const [passwordError, setPasswordError] = useState('');
   const {dispatch} = useContext(AuthContext)
   const navigate = useNavigate()

   const handleChange = e => {
      const { id, value } = e.target;

      if (id === 'email') {
         if (!validateEmail(value)) {
            setEmailError('Please enter a valid email address.');
         } else {
            setEmailError('');
         }
      } else if (id === 'phoneNumber') {
         if (!validatePhoneNumber(value)) {
            setPhoneError('Please enter a valid phone number.');
         } else {
            setPhoneError('');
         }
      }else if (id === 'password') {
         if (value.length !== 12) {
            // Password should contain exactly 12 characters
            setPasswordError('Password should be exactly 12 characters.');
         } else {
            setPasswordError('');
         }
      }
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }
      
   

   const handleClick = async e => {
      e.preventDefault()

      try {
         const res = await fetch(`${BASE_URL}/auth/register`, 
         {
            method:'post',
            headers: {
               'content-type':'application/json'
            },
            
            body: JSON.stringify(credentials)
         })
         const result = await res.json()

         if (!res.ok) {
            alert(result.message);
         } else {
            dispatch({ type: 'REGISTER_SUCCESS' });
            navigate('/login');
             toast.success('Registration successful!');
         }
      } catch(err) {
         console.log(err);
         toast.error('Something went wrong');
      }
   };
   

   const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
   };

   const validatePhoneNumber = (phoneNumber) => {
      const phoneRegex = /^[0-9]{10}$/;
      return phoneRegex.test(phoneNumber);
   };
   

   return (
      <section>
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={registerImg} alt="" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Register</h2>

                        <Form onSubmit={handleClick}>
                           <FormGroup>
                              <input type="text" placeholder='Username' id='username' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="email" placeholder='Email' id='email' onChange={handleChange} required />
                              {emailError && (
                                 <span style={{ color: 'red', fontSize: '0.8em' }}>{emailError}</span>
                              )}
                           </FormGroup>
                           <FormGroup>
                              <input type="password" placeholder='Password' id='password' onChange={handleChange} required />
                              {passwordError && (
                                    <span style={{ color: 'red', fontSize: '0.8em' }}>{passwordError}</span>
                                    )}
                           </FormGroup>
                           <FormGroup>
                              <input type="tel" pattern="[0-9]{10}" placeholder="Phone Number" id="phoneNumber" onChange={handleChange} required/>
                              {phoneError && (
                                 <span style={{ color: 'red', fontSize: '0.8em' }}>{phoneError}</span>
                              )}
                           </FormGroup>
                           

                           <Button className='btn secondary__btn auth__btn' type='submit'>Create Account</Button>
                        </Form>
                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
         {/* <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} /> */}
      </section>
   )
}

export default Register