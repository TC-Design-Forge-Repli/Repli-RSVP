import React, { useState } from 'react';
import {useSelector} from 'react-redux';


// MUI Imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import styled from "styled-components";
import { Grid } from "@mui/material";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function RemindersPage() {
 
  // const store = useSelector((store) => store);


  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [receiveReminders, setReceiveReminders] = useState(false)

  const dispatch = useDispatch();
  const history = useHistory();

  const handleRemindersSubmission = (event) => {
    event.preventDefault();

    let reminders = {
      email:email,
      phoneNumber:phoneNumber,
      receiveReminders:receiveReminders
    }
    console.log('These are the communication options', reminders)

    dispatch({
      type:'SAGA/CREATE_REMINDERS',
      payload: reminders
    })
    history.push('/success')//sends guest to the Success Page
  }//end handleCommunicationSubmission

  return (
    <div>
      <h4>What's the best way for us to communicate with you?</h4>

        <TextField
          // required
          id="outlined-required"
          label="Email"
          // defaultValue="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <h4>OR</h4>

        <TextField
          // required
          id="outlined-required"
          label="Phone Number"
          // defaultValue="Phone Number"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />  


        <FormControlLabel 
          control={< Checkbox/>} 
          label="I would like to receive event updates and reminders."
          checked={receiveReminders}
          onChange={()=> setReceiveReminders(!receiveReminders)}
        />
   
   

      {/* Back Button */}
        <Button 
          className="backToEventCodePage"
          type="back"
          variant="outlined" 
          style={{color:"#4330DA", 
          border:"2px solid #4330DA", 
          marginTop:"25px",
          marginLeft:"20px"}}
          onClick={() => history.push('/rsvp')}>Back
        </Button>

        <Button 
          className="backToEventCodePage"
          type="back"
          variant="outlined" 
          style={{color:"#4330DA", 
          border:"2px solid #4330DA", 
          marginTop:"25px",
          marginLeft:"20px"}}
          onClick={handleRemindersSubmission}>Submit
        </Button>
   </div>
  );
}

export default RemindersPage;
