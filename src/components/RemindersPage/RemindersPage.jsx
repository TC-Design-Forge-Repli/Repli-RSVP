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
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function RemindersPage() {
 
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [receiveReminders, setReceiveReminders] = useState(false)
  const storePartyId = useSelector(store => store.storeNavigation.storePartyId);
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const party_id=params.id
    dispatch({
      type: 'SAGA/FETCH_PARTY_ID',
      payload: {party_id: params.id}
    })
 
    console.log(params.id)
  }, [params.id])



  const handleRemindersSubmission = (event) => {
    event.preventDefault();

    let reminders = {
      email:email,
      phoneNumber:phoneNumber,
      receiveReminders:receiveReminders,
      party_id:storePartyId[0]
    }
    console.log('These are the guests communication options', reminders)

    dispatch({
      type:'SAGA/CREATE_REMINDERS',
      payload: reminders
    }) 
    dispatch({
      type: 'STORE_PARTY_ID',
      payload: storePartyId
    })
    history.push(`/success/${storePartyId[0]}`)
    // history.push(`/success/${storePartyId}`)
    //sends guest to the Success Page
  }//end handleCommunicationSubmission


  

  return (
    <div>
      <h4>What is the best way for us to communicate with you?</h4>

        <TextField
          // required
          id="outlined"
          label="Email"
          sx={{
           
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "#4330DA"},
              "&:focus-within":{borderColor: "#4330DA",}
            }
            ,
          }}
        //  sx={{borderColor:"#4330DA"}}
          // color="#4330DA"
          // defaultValue="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <h4>OR</h4>

        <TextField
          // required
          id="outlined"
          label="Phone Number"
          sx={{
            
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "#4330DA" },
            },
          }}
          // defaultValue="Phone Number"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />  


        <FormControlLabel 
          control={< Checkbox style={{color:"#4330DA"}}/>} 
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
          onClick={() => history.push(`/rsvp/${storedPartyId}`)}>Back
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
