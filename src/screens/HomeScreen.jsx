import React from 'react';
import Search from '../components/Search';
import Trips from '../components/Trips';

const HomeScreen = () => {
  return (
    <div>
      <h1 className='text-center text-black p-2 md:text-5xl text-xl '>Welcome To Bus App </h1>
      <Search />
      
    </div>
  )
}

export default HomeScreen