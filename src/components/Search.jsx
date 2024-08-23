import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";
import { getTrips } from "../slices/tripSlice";
import { useNavigate } from 'react-router-dom';


const Search = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${BASE_URL}/api/trips/?from=${from}&to=${to}&date=${date}`
      );
      const data = await res.data;
      dispatch(getTrips({ ...data }));
      navigate('/trips');

      
    } catch (err) {
      console.log(err);
      toast.warn(err.response.data.message);
      dispatch(getTrips([]));
      console.log("Error", err.response.data);
    }
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col lg:flex-row shadow-xl mt-10 md:mt-28 w-auto justify-center p-5 rounded-lg bg-white"
        onSubmit={submitHandler}
      >
        <input
          className=" px-4 py-2 border-b border-black outline-none  sm:block focus:border-blue-900 focus:border-b-2 mx-2 placeholder:text-black"
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="From"
          required
        />

        <input
          type="text"
          className="px-4 py-2 border-b border-black outline-none md:block focus:border-blue-900 focus:border-b-2 mx-2 placeholder:text-black"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To"
          required
        />

        <input
          type="date"
          className="px-4 py-2 border-b border-black outline-none md:block focus:border-blue-900 focus:border-b-2 mx-2"
          value={date}
          format="yyyy-mm-dd"
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          placeholder="Date"
          required
        />

        <button
          type="submit"
          variant="outlined"
          className="text-white border border-black  hover:bg-gray-500 bg-black px-5 rounded-lg"
          
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
