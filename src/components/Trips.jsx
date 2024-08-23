import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Container, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Trips = () => {
  const { trips } = useSelector((state) => state.trip);
  const Trips = Object.values(trips);
  const [visibleTrips, setVisibleTrips] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setVisibleTrips(Trips);
  }, [trips]);


  function buttonClick() {
    navigate("/");
    localStorage.removeItem("trips");
  }
  return (
    <div>
      <Container className="p-8">
        <Button
          type="button"
          variant="outlined"
          className="border border-black bg-white text-black rounded-lg p-2 mx-2 my-2"
          onClick={() => {
            buttonClick();
          }}
        >
          <ArrowBackIcon/>
          Back
        </Button>
        {visibleTrips?.map((trip) => (
          <Card key={trip._id} className="bg-red-500 p-3 m-5">
            <h2 className="text-center">
              {trip.origin.toUpperCase()} - {trip.destination.toUpperCase()}
            </h2>
            <div className="flex justify-between flex-wrap">
              <div>
                <span className="m-2">
                  <strong>Date</strong>-{trip.date.slice(0, 10)}
                </span>
                <br />
                <span className="m-2">
                  <strong>Arrival Time</strong>-{trip.arrivalTime}
                </span>
                <br />
                <span className="m-2">
                  <strong>Departure Time</strong>-{trip.departureTime}
                </span>
              </div>
              <div>
                <span className="m-2">
                  <strong>Bus Number</strong>-{trip.busNumber}
                </span>
                <br />
                <span className="m-2">
                  <strong>Price</strong>-{trip.price}
                </span>
                <br />
                <Link to={`/trip/${trip._id}`}>
                  <Button
                    type="button"
                    variant="outlined"
                    className="bg-black text-white border-white hover:bg-white hover:text-black hover:border-black m-2"
                  >
                    Book Seats
                  </Button>
                </Link>
              </div>
            </div>
            <h1 className="text-center">
              Available Seats - {trip.availableSeats}
            </h1>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default Trips;
