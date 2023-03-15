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


import { makeStyles, Switch } from '@material-ui/core';


// import { SwitchBase } from '@material-ui/core/SwitchBase';

function RemindersPage() {
 
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [receiveReminders, setReceiveReminders] = useState(false)

  // const useStyles = makeStyles({
  //   switch: {
  //     '&$checked': {
  //       color: "#4330DA",
  //     },
  //     '&$checked + $track': {
  //       backgroundColor: "#4330DA",
  //     },
  //   },
  //   checked: {},
  //   track: {},
  // });

  // function CustomSwitch() {
  //   const classes = useStyles();
  // }
  
  
  const [checked, setChecked] = useState(false);
  
  
  const storePartyId = useSelector(store => store.storeNavigation.storePartyId);
  const partyNames = useSelector((store) => store.partyNames);

  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    const party_id=params.id
    dispatch({
      type: 'STORE_PARTY_ID',
      payload: params.id
    })
    console.log(params.id)
  }, [params.id])


  const handleRemindersSubmission = (event) => {
    event.preventDefault();

    let reminders = {
      email:email,
      phoneNumber:phoneNumber,
      receiveReminders:receiveReminders,
      // receiveReminders:event.target.checked,
      party_id:storePartyId.party_id
    }
    console.log('These are the guests communication options', reminders)

    dispatch({
      type:'SAGA/CREATE_REMINDERS',
      payload: reminders
    }) 

    history.push(`/success/${storePartyId.party_id}`) //sends guest to the Success Page
  }//end handleCommunicationSubmission


  return (
    <>

      <h4>What is the best way for us to communicate with you?</h4>
     
        <TextField
          // required
          id="outlined"
          label="Email"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "#4330DA" },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset":{borderColor:"#4330DA"}
            },
            "& label.Mui-focused":{color:"#4330DA"},
            margin:"5px"
          }}
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
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset":{borderColor:"#4330DA"}
            },
            "& label.Mui-focused":{color:"#4330DA"},
            margin:"5px"
          }}
          // defaultValue="Phone Number"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />  

        <FormControlLabel
          control ={
            <Switch 
            style={{
              color: "#4330DA",
              '& .MuiSwitchTrack': {
                backgroundColor: 'lightgray',
              },
              "& .MuiSwitchColorPrimary.MuiChecked + .MuiSwitchTrack": {
                backgroundColor: '#4330DA',
              },
            }}
              // style={{color:"#4330DA", }} trackcolor="green" checkedtrackcolor="#4330DA" 
              checked={receiveReminders}
              onChange={(event) => setReceiveReminders(event.target.checked)}
             
            />}
            label="I would like to receive updates and reminders"
          />

       
       
       

     
        <Button 
          className="backToEventCodePage"
          type="back"
          variant="outlined" 
          style={{color:"#4330DA", 
                  border:"2px solid #4330DA", 
                  marginTop:"25px",
                  marginLeft:"20px"}}
          onClick={() => history.push(`/rsvp/${storePartyId.party_id}`)}>Back
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

   </>
  );
}


export default RemindersPage;

//Works
{/* <FormControlLabel
            control={
              <Switch
                checked={receiveReminders}
                onChange={(event) => setReceiveReminders(event.target.checked)}
              />}
              label="I would like to get receive updates and reminders"
          
          /> */}

{/* Original Toggle Code */}
        {/* <FormGroup>
          <FormControlLabel 
              control={<Switch checked={receiveReminders}  onChange={()=> setReceiveReminders(!receiveReminders)} />}
              label="I would like to receive event updates and reminders."
          />
        </FormGroup>
 */}



   {/* Original checkbox code */}
   {/* <FormControlLabel 
          control={<Switch checked={receiveReminders}   onChange={()=> setReceiveReminders(!receiveReminders)}}
          // control={< Checkbox style={{color:"#4330DA"}}/>} 
          label="I would like to receive event updates and reminders."
          // checked={receiveReminders}
          // onChange={()=> setReceiveReminders(!receiveReminders)}
        /> */}