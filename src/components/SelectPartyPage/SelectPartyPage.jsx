import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';



// MUI Imports
import Button from '@mui/material/Button';
// import styled from "styled-components";
import { Grid } from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

// Alternate way to style...
// From Laura's solo project
// const styles = {
//   padding: {
//     paddingTop: "20px",
//     marginTop: "20px"
//   }
// }
// In the return:
// <div className="card mb-3" sx={{maxWidth: '540px'}} style={styles.padding}>



function SelectPartyPage() {

  const params = useParams();
  const dispatch= useDispatch();
  const history = useHistory();

  const partyNames = useSelector((store) => store.partyNames);
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { label: '' },
    { label: '' },
    { label: '' },
    { label: '' },
    { label: '' },

  ];

  const sendToRSVP = (event, id) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    dispatch({
      type: 'STORE_PARTY_ID',
      payload: id
    })
    history.push(`/rsvp/${id}`);
  }

  useEffect(() => {
    const eventCode=params.id
    dispatch({
          type: 'SAGA/FETCH_PARTY_NAMES',
          payload: eventCode
    })
  }, [params.id])


  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <h4 style={{marginLeft:"15px", fontFamily:"roboto"}}>Welcome, please select your party:</h4>


    {/* Map through Party Names - each name listed on its own button */}
      <div>
        <Grid container direction="column">
          {partyNames.map(partyName => (    
            <Button 
              key={partyName.id}
              className="PartyNameButton"
              type="name"
              variant="contained" 
              size="small"
              style={{backgroundColor:"#4330DA", 
                    textTransform:"none", 
                    marginTop:"10px",
                    marginLeft:"20px",
                    marginRight:"20px"
                  }}
              onClick={(event) => sendToRSVP(event, partyName.id)}>
              {partyName.name}
            </Button>
           ))}
        </Grid>
      </div>


    {/* Back Button - will send user back to the Event Code page */}
      <Button 
        className="backToEventCodePage"
        type="back"
        variant="outlined" 
        style={{color:"#4330DA", 
              border:"2px solid #4330DA", 
              marginTop:"25px",
              marginLeft:"20px"}}
        onClick={() => history.push('/eventCode')}
        >
          Back
      </Button>
    </>
  );
}

export default SelectPartyPage;


// type="back"

// //         
//         style={{color:"#4330DA", 
//               border:"2px solid #4330DA", 
//               marginTop:"25px",
//               marginLeft:"20px"}}
//               variant="outlined" 

// style={{
//   backgroundColor: "#4330DA",
//   marginLeft: "50px",
//   marginRight: "50px"}},
//   variant="contained"
