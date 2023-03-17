import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import RsvpPageItem from './RsvpPageItem';
//mui imports
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { makeStyles } from '@mui/styles';



  const useStyles = makeStyles({
    stepperIcon: {
      color: 'purple', // replace with color
      '& .MuiStepIcon-active': {
        color: 'purple', // replace with color
      },
    },
  });
  
  function RsvpPage() {
    const classes = useStyles();
    const partyGuests = useSelector(store => store.partyGuests);
    const party_name = partyGuests.party_name;
    const storedEventCode = useSelector(store => store.storeNavigation.storeEventCode);
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(2);
  
    const steps = [
      { label: '' },
      { label: '' },
      { label: '' },
      { label: '' },
      { label: '' },
    ];
  
    useEffect(() => {
      const party_id = params.id;
      dispatch({
        type: 'SAGA/FETCH_PARTY_GUESTS',
        payload: params.id
      })
    }, [params.id])
  
    return (
      <>
        <Stepper activeStep={activeStep} classes={{ root: classes.stepperIcon }}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>

      <h2>{party_name}</h2>
      {partyGuests.map(partyGuest => {
        return (
            <RsvpPageItem  
              key={partyGuest.guest_id}
              partyGuest={partyGuest}
            />
        )
      })}

      <div>
      <Button
        className="backToSelectPartyButton"
        style={{color:"#4330DA",
                border: "2px solid #4330DA",
                marginTop:"25px",
                marginLeft:"20px"}}
                variant="outlined"
        onClick={() => history.push(`/selectParty/${storedEventCode}`)}
        style={{
          textTransform:"none", 
          marginTop:"10px",
          marginLeft:"20px",
          marginRight:"20px"
        }}>Back
      </Button>
      
      <Button
        className="rsvpSubmitButton"
        style={{
          backgroundColor: "#4330DA",
          marginTop: "25px",
          marginLeft: "30px",
          marginRight: "20px",
        }}
          variant="contained"
        type="submit"
        onClick={() => history.push(`/reminders/${partyGuests[0].party_id}`)}
        style={{
          backgroundColor:"#4330DA", 
          textTransform:"none", 
          marginTop:"10px",
          marginLeft:"20px",
          marginRight:"20px"
        }}>Next
      </Button>
      </div>
    </>
  );
}

export default RsvpPage;
