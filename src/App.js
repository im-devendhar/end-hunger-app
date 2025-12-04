
// src/App.js

import React, { /* useEffect, */ useState } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  // CI fails on no-unused-vars; comment out until used.
  /* useNavigate */
} from 'react-router-dom';
import './App.css';

import LoginPage from './components/Login';
import CreateAccount from './components/CreateAccount';
import DonorPage from './components/Donor';
import RecipientPage from './components/Recipient';
import CrowdFunding from './components/CrowdFunding';
import axios from 'axios';
import FoodTable from './components/FoodTable';

function App() {
  const [json, setJson] = useState({});
  const [user, setuser] = useState('');

  /**
   * Handles click to fetch food list.
   * NOTE:
   * - ESLint/CI were failing due to unused vars/imports elsewhere; those are commented above.
   * - If FoodTable expects the payload, prefer setJson(response.data) over setJson(response).
   */
  const foodListClickHandler = async (user) => {
    const userBool = user === 'donor' ? false : true; // donor => not requesting food
    const rawData = { donate_food: userBool };

    try {
      const response = await axios.post('http://127.0.0.1:5000/get_food_list', rawData);
      // If FoodTable expects the actual data payload, use response.data:
      // setJson(response.data);
      setJson(response);
    } catch (error) {
      console.error('Food list creation error: ', error);
      alert('Error submitting food donation.');
    }

    setuser(user);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route
          path="/donor"
          element={<DonorPage foodListClickHandler={foodListClickHandler} />}
        />
        <Route
          path="/recipient"
          element={<RecipientPage foodListClickHandler={foodListClickHandler} />}
        />
        <Route
          path="/crowdfunding"
          element={<CrowdFunding foodListClickHandler={foodListClickHandler} />}
        />
        <Route
          path="/food-list"
          element={
            <FoodTable
              foodList={json}
              // This currently returns true when user === 'donor'.
              // If isRecipient should be true only for recipients, consider: user === 'recipient'
              isRecipient={user === 'donor' ? true : false}
            />
          }
        />
      </Routes>
    </Router>
  );
}

