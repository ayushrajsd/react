import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';

const Home = () => {
  return (
    <>
      <Hero >
        <Banner title="luxurious" subtitle="deluxe rooms starting at INR 4999">
          <Link to="/rooms" className = "btn-primary">our rooms</Link>
          </Banner>
    </Hero>
    <Services/>
    </>
  )
}



export default Home;    

