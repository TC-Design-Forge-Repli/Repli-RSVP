import React, { useState } from 'react';
import {useSelector} from 'react-redux';


// MUI Imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { makeStyles, Switch } from '@material-ui/core';
import { Grid } from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


function RemindersPage() {
 
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [receiveReminders, setReceiveReminders] = useState(false)


  const useStyles = makeStyles({
    switch: {
      // '& .MuiSwitch-thumb': {
      //   backgroundColor: "#4330DA",
      // },
      "& .Mui-checked": {
        color: "#4330DA"
        // transform: "translateX(25px) !important"
      },
      "& .MuiSwitch-track": {
        backgroundColor: "#4330DA !important"
      }
    },
    checked: {},
    track: {},
  });
  
  
  const storePartyId = useSelector(store => store.storeNavigation.storePartyId);
  const partyNames = useSelector((store) => store.partyNames);
  const [activeStep, setActiveStep] = useState(3);

  const steps = [
    { label: '' },
    { label: '' },
    { label: '' },
    { label: '' },
    { label: '' },

  ];

  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const classes= useStyles();


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
      party_id:storePartyId.party_id
    }
    console.log('These are the guests communication options', reminders)

    dispatch({
      type:'SAGA/CREATE_REMINDERS',
      payload: reminders
    }) 

    history.push(`/success/${storePartyId.party_id}`) //sends guest to the Success Page
  //end handleCommunicationSubmission
  }

  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>


      <h4
        style={{ marginLeft:"20px",
        marginRight:"20px"}}
      >What is the best way for us to communicate with you?</h4>
     
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
            margin:"5px",
            marginTop:"10px",
                    marginLeft:"20px",
                    marginRight:"20px"
          }}
          // defaultValue="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <h4
          style={{ marginLeft:"20px",
          marginRight:"20px"}}
        >OR</h4>

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
            margin:"5px",
            marginTop:"10px",
                    marginLeft:"20px",
                    marginRight:"20px"
          }}
          // defaultValue="Phone Number"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />  

        <FormControlLabel
          control ={
            <Switch 
              className={classes.switch}
              checked={receiveReminders}
              onChange={(event) => setReceiveReminders(event.target.checked)}
            />}
            label="I would like to receive updates and reminders"
            style={{ 
              marginLeft:"20px",
              marginTop:"15px"
        }}
          />



        <Button
          className="backToRsvpPage"
          variant="outlined"
          style={{
            textTransform: 'none',
            color:"#4330DA",
            fontFamily: 'Montserrat', 
            border:"1.5px solid #4330DA", 
            marginTop:"35px",
            marginLeft:"20px"
          }}
          onClick={() => history.push(`/rsvp/${storePartyId.party_id}`)}
        >
          Back
        </Button>
      
      <Button
        className="sendToSuccessPage"
        variant="contained"
        style={{
          textTransform: 'none',
          backgroundColor: '#4330DA',
          fontFamily: 'Montserrat',
          color: 'white',
          marginTop: '35px',
          marginLeft: '20px',
        }}
        onClick={handleRemindersSubmission}
      >
        Submit
      </Button>
  
   </>
  );
}


export default RemindersPage;

