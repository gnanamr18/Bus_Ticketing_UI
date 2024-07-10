import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Container, Button,  } from '@mui/material';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';



const  Trips = () => {
  const { trips } = useSelector((state) => state.trip);
  const Trips = Object.values(trips);
  const [visibleTrips, setVisibleTrips] = useState();

  useEffect(() => {
   
      setVisibleTrips(Trips);
    
  }, [trips]);

  const handleRemoveCard = (id) =>{
    setVisibleTrips((prevTrips) => prevTrips.filter((trip) => trip._id !== id));

    localStorage.removeItem('trips')
  }
  console.log(visibleTrips)

  return (
    <div>
      { visibleTrips?.length ? (
        <Container className='p-2'>
        {visibleTrips?.map((trip) => (
          <Card key={trip._id} className='bg-red-500 p-5 m-5'>
             <button
                onClick={() => handleRemoveCard(trip._id)}
                className='absolute top-2 right-2 bg-white border border-black rounded-full p-1 hover:bg-gray-200'
              >
                <CloseIcon className='text-black' />
              </button>
           
            <h2 className='text-center'>{trip.origin.toUpperCase()} - {trip.destination.toUpperCase()}</h2>
            <div className='flex justify-between flex-wrap'>
              <div>
                <span className='m-2'><strong>Date</strong>-{trip.date.slice(0, 10)}</span><br />
                <span className='m-2'><strong>Arrival Time</strong>-{trip.arrivalTime}</span><br />
                <span className='m-2'><strong>Departure Time</strong>-{trip.departureTime}</span>
              </div>
              <div>
                <span className='m-2'><strong>Bus Number</strong>-{trip.busNumber}</span><br />
                <span className='m-2'><strong>Price</strong>-{trip.price}</span><br />
                <Link to={`/trip/${trip._id}`}>
                  <Button type='button' variant="outlined" className='bg-black text-white border-white hover:bg-white hover:text-black hover:border-black m-2'>Book Seats</Button>
                </Link>
              </div>
            </div>
            <h1 className='text-center'>Available Seats - {trip.availableSeats}</h1>
          </Card>
        ))}
      </Container>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Trips;