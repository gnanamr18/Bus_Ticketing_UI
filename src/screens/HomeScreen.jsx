import React from 'react';
import Search from '../components/Search';
import Trips from '../components/Trips';

const HomeScreen = () => {
  return (
    <div>
      <h1 className='text-center text-yellow-100/100 md:text-5xl text-xl '>Welcome To Bus App </h1>
      <Search />
      <div className='bg-white mb-20'>
        <Trips />
      </div>
    </div>
  )
}

export default HomeScreen