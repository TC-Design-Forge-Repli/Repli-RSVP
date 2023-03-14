import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


//MUI Imports
import Button from '@mui/material/Button';




function SuccessPage() {

  const storedPartyId = useSelector(store => store.storeNavigation.storePartyId);
  const partyGuests = useSelector(store => store.storeNavigation.partyGuests);
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

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
      <h2>You're all set - see you on the BIG day!</h2>

      <h3>Please review your responses before submitting</h3>
    
      {/* {partyGuests.map((partyGuest) => (
        <div key={partyGuest.guest_id}>
        {partyGuest.response ?
          <>
            <li>{partyGuest.name}</li>
            <li>{partyGuest.response}</li>
            <li>{partyGues.meal_id}</li>
          </>

          :
          <>
            <li>{partyGuest.name}</li>
            <li>{partyGuest.response}</li>
            <li>{partyGues.meal_id}</li>
          </>
        }
        </div>
      ))} */}
          
        
      

      <Button
          className="backEditResponsesPage"
          type="back"
          variant="outlined" 
          style={{
            textTransform: 'none',
            color:"#4330DA", 
            border:"2px solid #4330DA", 
            marginTop:"25px",
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
            color: '#43303DA',
            marginTop:"25px",
            marginLeft:"20px"
          }}
          onClick={() => history.push(`/about`)}
      >
        Learn more about Repli
      </Button> 
    </>
  )
}


export default SuccessPage;



