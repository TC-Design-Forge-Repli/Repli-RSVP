import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


//MUI Imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function SuccessPage() {

  const storedPartyId = useSelector(store => store.storeNavigation.storePartyId);
  const partyGuests = useSelector(store => store.partyGuests);
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(4);

  const steps = [
    { label: '' },
    { label: '' },
    { label: '' },
    { label: '' },
    { label: '' },

  ];

  useEffect(() => {
    const party_id=params.id
    dispatch({
      type: 'STORE_PARTY_ID',
      payload: params.id
    })

    dispatch({
      type: 'SAGA/FETCH_PARTY_GUESTS',
      payload: params.id
    })
    console.log(params.id)

  }, [params.id])

  return(
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <h2>All set - see you on the BIG day!</h2>
      <h3>Please review your responses before submitting</h3>
      <Table sx={{ minWidth: 200}} aria-label="simple table">
        <TableBody>
        {partyGuests.map((partyGuest) => {
          return (
            <TableRow key={partyGuest.guest_id}>
               <TableCell>{partyGuest.guest_name}</TableCell>
              {partyGuest.guest_response ?
              
              <>
                {/* <TableCell>{partyGuest.guest_name}</TableCell> */}
                <TableCell>Attending</TableCell>
                <TableCell>{partyGuest.meal_name}</TableCell>
              </>

              :
              <>
                {/* <TableCell>{partyGuest.guest_name}</TableCell> */}
                <TableCell>Not Attending</TableCell>
                <TableCell></TableCell>
              </>
              }
            </TableRow>
          )
        })}
        </TableBody>
      </Table>
      <Button
          className="backEditResponsesPage"
          type="back"
          variant="outlined" 
          style={{
            textTransform: 'none',
            color:"#4330DA",
            fontFamily: 'Montserrat', 
            border:"1.5px solid #4330DA", 
            marginTop:"35px",
            marginLeft:"20px"
          }}
          onClick={() => history.push(`/editRsvp/${storedPartyId.party_id}`)}
      >
        Edit My RSVP
      </Button>
      <Button
          type="back"
          style={{
            textTransform: 'none',
            backgroundColor: '#4330DA',
            fontFamily: 'Montserrat',
            color: 'white',
            marginTop: '35px',
            marginLeft: '20px',
          }}
          onClick={() => history.push(`/about`)}
      >
        Learn More About Repli
      </Button> 
    </>
  )
}


export default SuccessPage;



