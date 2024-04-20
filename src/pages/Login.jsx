import React, { useContext, useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'


const Login = () => {
   const [credentials, setCredentials] = useState({
      email: undefined,
      password: undefined
   })

   const [emailError, setEmailError] = useState('');
   const [passwordError, setPasswordError] = useState('');
   

   const {dispatch} = useContext(AuthContext)
   const navigate = useNavigate()

   const handleChange = (e) => {
      const { id, value } = e.target;

      if (id === 'email') {
         // Email validation
         if (!validateEmail(value)) {
            setEmailError('Please enter a valid email address.');
         } else {
            setEmailError('');
         }
      }else if (id === 'password') {
         if (value.length !== 12) {
            // Password should contain exactly 12 characters
            setPasswordError('Password should be exactly 12 characters.');
         } else {
            setPasswordError('');
         }
      }

      setCredentials((prev) => ({ ...prev, [id]: value }));
   };

   const handleClick = async e => {
      e.preventDefault();

      if (emailError) {
         return;
      }

      dispatch({type:'LOGIN_START'})

      try {
         const res = await fetch(`${BASE_URL}/auth/login`, {
            method:'post',
            headers: {
               'content-type':'application/json'
            },
            credentials:'include',
            body: JSON.stringify(credentials)
         })

         const result = await res.json()
         if(!res.ok) alert(result.message)
         console.log(result.data)

         dispatch({type:"LOGIN_SUCCESS", payload:result.data})
         navigate('/')
      } catch(err) {
         dispatch({type:"LOGIN_FAILURE", payload:err.message})
      }
   }

   const validateEmail = (email) => {
      // Regular expression for a valid email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
   };

   return (
      <section>
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img">
                        <img src={loginImg} alt="" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Login</h2>

                        <Form onSubmit={handleClick}>
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
                           
                           <Button className='btn secondary__btn auth__btn' type='submit'>Login</Button>
                        </Form>
                        <p>Don't have an account? <Link to='/register'>Create</Link></p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default Login