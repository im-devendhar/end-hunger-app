
// src/components/Recipient.js

import { Button, /* TextField, */ Typography } from '@mui/material';
// CI fails due to ESLint "no-unused-vars" for TextField.
// Commented out until you actually use MUI <TextField /> components.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipientPage = (props) => {
  const { foodListClickHandler } = props;

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const [requestDetails, setRequestDetails] = useState({
    food_name: '',
    location: '',
    phone_number: '',
    donate_food: false,
  });

  // Disable submit if required fields are empty.
  let buttonStatus = true;
  if (
    requestDetails.food_name === '' ||
    requestDetails.location === '' ||
    requestDetails.phone_number === ''
  ) {
    buttonStatus = false;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRequestDetails({ ...requestDetails, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/request_food', requestDetails);
      alert('Food request submitted successfully.');
    } catch (error) {
      console.error('Food request error: ', error);
      alert('Error submitting food request.');
    }
  };

  const ViewListFunc = (user) => {
    navigate('/food-list');
    foodListClickHandler(user);
  };

  return (
    <div className="recepinetImageBackground">
      <div className="recipient-page page">
        <header className="logout_session_div">
          <Button
            className="logout_button"
            variant="outlined"
            color="inherit"
            // FIX: pass the correct string "recipient" (was "reciepient")
            onClick={() => ViewListFunc('recipient')}
          >
            View List
          </Button>
          <Button
            className="logout_button"
            variant="outlined"
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </header>

        <Typography variant="h5">Request Form</Typography>

        <input
          className="input_field_class_donor"
          name="food_name"
          onChange={handleChange}
          type="text"
          placeholder="Food Name"
          required
        />
        <input
          className="input_field_class_donor"
          name="location"
          onChange={handleChange}
          type="text"
          placeholder="Area"
          required
        />
        {/* Tip: phone numbers can include +country codes and leading zeros; consider type="tel" */}
        <input
          className="input_field_class_donor"
          name="phone_number"
          onChange={handleChange}
          type="text" /* or type="tel" */
          placeholder="Contact"
          required
        />

        {/* <input className="input_field_class_donor" type="text" placeholder="Request Details" required /> */}

        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!buttonStatus}>
          Submit Request
        </Button>
      </div>
    </div>
  );
};

