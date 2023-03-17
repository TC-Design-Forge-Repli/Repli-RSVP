import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import RsvpPageItem from './RsvpPageItem';
//mui imports
import Button from '@mui/material/Button';

function RsvpPage() {

  const partyGuests = useSelector(store => store.partyGuests);
  const party_name = partyGuests.party_name;
  const storedEventCode = useSelector(store => store.storeNavigation.storeEventCode);
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const party_id = params.id;
    dispatch({
      type: 'SAGA/FETCH_PARTY_GUESTS',
      payload: params.id
    })
  }, [params.id])



  return (
    <>
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
