
import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CrowdFunding = (props) => {
    const { foodListClickHandler } = props
    const navigate = useNavigate();
    const [donation, setDonation] = useState({
        donor_email: '',
        amount: 0,
        note: ''
    });
    let buttonStatus = true
    if (donation.donor_email === "" || donation.amount === "") {
        buttonStatus = false;
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setDonation({ ...donation, [name]: value });
      
    };

    const handleSubmit = async () => {
        // try {
        //     await axios.post('http://127.0.0.1:5000/donate_money', donation);
            alert("Donation successful.");
        // } catch (error) {
        //     console.error("Donation error: ", error);
        //     alert("Error making donation.");
        // }
    };
    const handleLogout = () => {
        navigate('/');
    };
    const donorhandler = () => {
        navigate('/donor');
    };

    const ViewListFunc = (user) => {
        navigate('/food-list')
        foodListClickHandler(user)
    }

    return (
      <div className='CrowdFundBackground'>
        <div className="recipient-page page">
             <header className='logout_session_div'>
                <Button className='logout_button' variant="outlined" color="inherit" onClick={()=>ViewListFunc("donor")}>View List</Button>
                <Button className='logout_button' variant="outlined" color="inherit" onClick={handleLogout}>Logout</Button>
            </header>
            <Typography variant="h5">Crowdfunding Form</Typography>
            <input className='input_field_class_donor' name="donor_email" onChange={handleChange} type="text" placeholder="Email" required />
            <input className='input_field_class_donor' name="amount" onChange={handleChange} type="number" placeholder="Amount" required />
            <input className='input_field_class_donor' name="note" onChange={handleChange} type="text" placeholder="Note(Optional)" />
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!buttonStatus} >Submit</Button>
            <Button variant="contained" color="primary" onClick={donorhandler}>Donate</Button>
        </div>
        </div>
        
    );
};
export default CrowdFunding

