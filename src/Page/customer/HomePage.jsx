import React from 'react'
import Hero from '../../components/customer/Hero'
import HowItWorks from '../../components/customer/HowItWorks'
import WhyChooseUs from '../../components/customer/WhyChooseUs'
import Service from '../../components/customer/Service' 

export const HomePage = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhyChooseUs />
      <Service />
    </>
  )
}