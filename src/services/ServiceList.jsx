import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'
import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData = [
   {
      imgUrl: weatherImg,
      title: `Calculate Weather`,
      desc: `Plan your adventures with confidence, equipped with real-time weather updates for every destination on our travel and tour booking website.`,
   },
   {
      imgUrl: guideImg,
      title: `Best Tour Guide`,
      desc: `Elevate your travel experience with our exceptional tour guides, blending expertise and enthusiasm to turn every journey into an unforgettable adventure.`,
   },
   {
      imgUrl: customizationImg,
      title: 'Customization',
      desc: `Tailor your travel experience to perfection with our customization options, where every detail is curated to match your unique preferences, ensuring a personalized and unforgettable adventure.`,
   },
]

const ServiceList = () => {
   return <>
      {
         servicesData.map((item, index) => (
            <Col lg='3' md='6' sm='12' className='mb-4' key={index}>
               <ServiceCard item={item} />
            </Col>))
      }
   </>

}

export default ServiceList