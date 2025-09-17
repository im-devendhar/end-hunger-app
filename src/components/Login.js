
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
const LoginPage = () => {
   const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let buttonStatus = true

    if(email !== "" && password !== ""){
        buttonStatus = false
    }
    
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
            if (response.data.role === 'donor') {
                navigate('/donor');
            } else {
                navigate('/recipient');
            }
        } catch (error) {
            console.error("Login error: ", error);
            alert("Invalid email or password.");
        }
    };
   
    return (
        <div className='myBackground'>
        <Typography
         variant="h4" className="app-title">EndHunger App</Typography>
      <div className="login-page page">
   
        <div className="login-form">
          <Typography variant="h6">Login</Typography>
          <input className='input_field_class' type="text" placeholder="Email"  onChange={(e) => setEmail(e.target.value)}  required />
            <input className='input_field_class' type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}  required />
          <Button className='buttonLogin' variant="contained" color="primary" onClick={handleLogin} disabled={buttonStatus}>Login</Button>
          <Button className='buttonLogin' variant="outlined" color="primary" onClick={() => navigate('/create-account')}>Create Account</Button>
        </div>
   
      </div>
      </div>
    );
  };
export default LoginPage

