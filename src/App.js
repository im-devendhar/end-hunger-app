import React, { useEffect, useState } from 'react';
import { HashRouter  as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './components/Login';
import CreateAccount from './components/CreateAccount';
import DonorPage from './components/Donor';
import RecipientPage from './components/Recipient';
import CrowdFunding from './components/CrowdFunding';
import axios from 'axios';
import FoodTable from './components/FoodTable';



function App() {
  const [json, setJson] = useState({})
  const [user, setuser] = useState('')

  
  const foodListClickHandler = async(user) => {
    let userBool =user === "donor" ? false : true
    const rawData = {
      donate_food: userBool
    }
    try {
    const response = await axios.post('http://127.0.0.1:5000/get_food_list', rawData );
    setJson(response)
  } catch (error) {
      console.error("Food list creation error: ", error);
      alert("Error submitting food donation.");
  }
    // setJson(data)
    setuser(user)
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/donor" element={<DonorPage foodListClickHandler={foodListClickHandler} />} />
        <Route path="/recipient" element={<RecipientPage foodListClickHandler={foodListClickHandler} />} />
        <Route path="/crowdfunding" element={<CrowdFunding foodListClickHandler={foodListClickHandler}/>} />
        <Route path="/food-list" element={<FoodTable foodList={json} isRecipient={user === "donor" ? true : false }/>} />
      </Routes>
    </Router>
  );
}

export default App;
