import React from 'react'
import Packageform from '../components/Packageform'
import Company from '../components/company'
const AddPackage = () => {
  return (
    <div className='block  justify-center items-center'>
      <section className='md:mt-15 mt-25 mb-25  md:mb-18' ><Packageform /></section>
      <Company/>
     
    </div>
  )
}

export default AddPackage
