import React, { useState, useContext } from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'

import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'

const Booking = ({ tour, avgRating }) => {
   const { price, reviews, title } = tour
   const navigate = useNavigate()

   const { user } = useContext(AuthContext)

   const [booking, setBooking] = useState({
      userId: user && user._id,
      userEmail: user && user.email,
      tourName: title,
      fullName: '',
      phone: '',
      guestSize: 1,
      // bookAt: '',
      startDate: '',
      endDate: '',
      transportation: ''
   })

   const [phoneError,setPhoneError] = useState('');
   const [fullNameError, setFullNameError] = useState('');

   const handleChange = (e) => {
      const { id, value } = e.target;

      // Full name validation
   if (id === 'fullName') {
      if (!validateFullName(value)) {
         setFullNameError('Please enter a valid name.');
      } else {
         setFullNameError('');
      }
   }

      // Phone number validation
      if (id === 'phone') {
         if (!validatePhoneNumber(value)) {
            setPhoneError('Please enter a valid phone number.');
         } else {
            setPhoneError('');
         }
      }

      setBooking((prev) => ({ ...prev, [id]: value }));
   };

   const validatePhoneNumber = (phoneNumber) => {
      // Adjust the regular expression based on your requirements
      return /^\d{10}$/.test(phoneNumber);
   };

   const validateFullName = (fullName) => {
      // Adjust the validation criteria based on your requirements
      return /^[a-zA-Z\s]+$/.test(fullName);
   };

   const serviceFee = 100
   const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee)

   const handleClick = async e => {
      e.preventDefault()
      console.log(booking)

      try {
         if (!user || user === undefined || user === null) {
            return alert('Please sign in')
         }

         const res = await fetch(`${BASE_URL}/booking`, {
            method: 'post',
            headers: {
               'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(booking)
         })

         const result = await res.json()

         if (!res.ok) {
            return alert(result.message)
         }
         navigate('/thank-you')
      } catch (error) {
         alert(error.message)
      }
   }

   return (
      <div className='booking'>
         <div className="booking__top d-flex align-items-center justify-content-between">
            <h3>Rs.{price} <span>/per person</span></h3>
            <span className="tour__rating d-flex align-items-center">
               <i class='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i>
               {avgRating === 0 ? null : avgRating} ({reviews?.length})
            </span>
         </div>

         {/* =============== BOOKING FORM START ============== */}
         <div className="booking__form">
            <h5>Information</h5>
            <Form className='booking__info-form' onSubmit={handleClick}>
               <FormGroup>
                  <input type="text" placeholder='Full Name' id='fullName' required
                     onChange={handleChange} />
                  {fullNameError && <span className='error-message'>{fullNameError}</span>}    
               </FormGroup>
               <FormGroup>
                  <input type="tel" placeholder='Phone' id='phone' required
                     onChange={handleChange} />
                  {phoneError && <span className="error-message">{phoneError}</span>}
               </FormGroup>
               <FormGroup className='d-flex align-items-center gap-3'>
                  {/* {<input type="date" placeholder='' id='bookAt' required
                     onChange={handleChange} />
                     <input type="date" placeholder='' id='bookAt' requried 
                     onchange={handleChange} /> */}
                  <input type="number" placeholder='Guest' id='guestSize' required
                     onChange={handleChange} /> 
                  <input
                  type="date"
                  placeholder='Start Date'
                  id='startDate'
                  required
                  onChange={handleChange}
                  />
                  <input
                  type="date"
                  placeholder='End Date'
                  id='endDate'
                  required
                  onChange={handleChange}
                  />   
               </FormGroup>

               <FormGroup className='d-flex align-items-center gap-3' style={{ flexDirection: 'row', margin: 0 }}>
                  <h7 style={{ fontSize: ".7em", paddingLeft: ".5em" }}>Transportation</h7>
                  <label style={{ fontSize: '.7em' }}>
                     <input
                        type="radio"
                        id="transportation"
                        value="train"
                        checked={booking.transportation === 'train'}
                        onChange={handleChange}
                        style={{ transform: 'scale(0.8)' }}
                     />
                     Train
                  </label>
                  <label style={{ fontSize: '.7em' }}>
                     <input
                        type="radio"
                        id="transportation"
                        value="bus"
                        checked={booking.transportation === 'bus'}
                        onChange={handleChange}
                        style={{ transform: 'scale(0.8)' }}
                     />
                     Bus
                  </label>
               </FormGroup>
            </Form>
         </div>
         {/* =============== BOOKING FORM END ================ */}


         {/* =============== BOOKING BOTTOM ================ */}
         <div className="booking__bottom">
            <ListGroup>
               <ListGroupItem className='border-0 px-0'>
                  <h5 className='d-flex align-items-center gap-1'>Rs{price} <i class='ri-close-line'></i> 1 person</h5>
                  <span>Rs{price}</span>
               </ListGroupItem>
               <ListGroupItem className='border-0 px-0'>
                  <h5>Service charge</h5>
                  <span>Rs{serviceFee}</span>
               </ListGroupItem>
               <ListGroupItem className='border-0 px-0 total'>
                  <h5>Total</h5>
                  <span>Rs{totalAmount}</span>
               </ListGroupItem>
            </ListGroup>

            <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
         </div>
      </div>
   )
}

export default Booking