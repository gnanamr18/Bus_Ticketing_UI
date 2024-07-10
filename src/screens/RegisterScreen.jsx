import React from "react";
import { TextField, Button, Link } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { USERS_URL, TICKET_URL, TRIPS_URL } from "../constants";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [ register ] = useRegisterMutation();

  const navigate = useNavigate();

  const color = grey[900];

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // const res = await register({name, email, password}).unwrap();
      const res = await axios.post(`${BASE_URL}${USERS_URL}/register`, {
        name,
        email,
        password,
      });
      console.log(res);
      dispatch(setCredentials({ ...res }));
      toast.success("Register successfull!");
      navigate("/");
      return res;
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
      return null;
    }
  };

  const getTextFieldStyles = () => ({
    "& .MuiInputLabel-root": {
      color: "white", // Label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "white", // Label color when focused
    },
    "& .MuiInputBase-input": {
      color: "white", // Input text color
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white", // Underline color when not focused
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white", // Underline color when focused
    },
    "& .MuiInputBase-input::placeholder": {
      color: "white", // Placeholder color
      opacity: 1, // To ensure the color is not affected by opacity
    },
  });

  return (
    <div className="m-5">
      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-1 w-96 gap-5 m-auto bg-black/50 p-10 rounded">
          <h1 className="text-center text-white text-xl">Sign Up</h1>
          <TextField
            id="standard-required"
            label="Name"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={getTextFieldStyles()}
          />
          <TextField
            id="standard-required"
            label="Email"
            type="email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={getTextFieldStyles()}
          />
          <TextField
            id="standard-required"
            label="Password"
            type="password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={getTextFieldStyles()}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ "&:hover": { backgroundColor: "white", color: "black" } }}
            className="w-5 bg-black px-2 px-4 py-2 font-bold"
          >
            Submit
          </Button>
          <p className="text-white">
            Already gave an Account - <Link href="/login">Click Here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;
