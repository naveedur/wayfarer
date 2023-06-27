import React from 'react'
import Layout from '../../components/Layout/Layout'
import './about.css'

const About = () => {
  return (
    <Layout title={"home - Travel"}>

    <div className='row aboutMain'>
      <div className="col-md-10 col-12">
      <p>
      “Welcome to <b>wayfarer world travel</b>, where we specialize in creating
      unforgettable travel experiences for our clients. With years of
      experience in the travel industry, our team of experts are
      dedicated to planning and executing personalized trips that
      exceed expectations. From romantic getaways to family 
      vacations, we offer a wide range of travel options to suit every
      need and budget. Our commitment to exceptional customer service
       ensures that every aspect of your journey is taken care of, 
      leaving you to relax and enjoy the journey. Let us handle the
      details, while you make memories that will last a lifetime. 
      Book your next adventure with <b>wayfarer world travel</b>
      Agency today!”
      </p>
      <p>Special Contacts Numbers:</p>
      <p><b>Helpline</b>: 0304-1110281 <b>Email</b>: wayfarer@gmail.com

</p>
</div>
    </div>
    </Layout>
  )
}

export default About