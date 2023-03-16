import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useState } from 'react';
import EditRsvpPageItem from './EditRsvpPageItem';
//mui imports
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function EditRsvpPage() {

    const partyGuests = useSelector(store => store.partyGuests);
    const storePartyId = useSelector(store => store.storeNavigation.storePartyId);
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
        console.log('params.id', params.id)
        dispatch({
          type: 'SAGA/FETCH_PARTY_GUESTS',
          payload: params.id
        })
        dispatch({
          type: 'STORE_PARTY_ID',
          payload: params.id
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
        <h2>Previous Answers</h2>
        {partyGuests.map((partyGuest) => {
          return (
            <EditRsvpPageItem
              key={partyGuest.guest_id}
              partyGuest={partyGuest}
            />
          );
        })}

            <div>
            <Button
                className="backToSelectPartyButton"
                variant="outlined"
                style={{
                    textTransform: 'none',
                    color:"#4330DA",
                    fontFamily: 'Montserrat', 
                    border:"1.5px solid #4330DA", 
                    marginTop:"35px",
                    marginLeft:"20px"
                  }}
                onClick={() => history.push(`/success/${storePartyId.party_id}`)}
            >
                Back
            </Button>
            <Button
                className="RsvpPageButton"
                variant="contained"
                style={{
                    textTransform: 'none',
                    backgroundColor: '#4330DA',
                    fontFamily: 'Montserrat',
                    color: 'white',
                    marginTop: '35px',
                    marginLeft: '20px',
                  }}
                onClick={() => history.push(`/editReminders/${storePartyId.party_id}`)}
            >
                Next
            </Button>
            </div>
        </>
    )
}

export default EditRsvpPage;