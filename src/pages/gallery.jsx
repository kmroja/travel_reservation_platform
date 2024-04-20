import React from 'react';
import { Container, Row, Col } from 'reactstrap'
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import '../styles/home.css';

const gallery = () => {
    return(
    <>
        <section>
         <Container>
            <Row>
               <Col lg='12'>
                  <h2 className="gallery__title">Visit our customers tour gallery</h2>
               </Col>
               <Col lg='12'>
                  <MasonryImagesGallery />
               </Col>
            </Row>
         </Container>
      </section>
    </>
    )
}


export default gallery;