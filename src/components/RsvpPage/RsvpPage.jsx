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
        style={{
          textTransform: 'none',
          color:"#4330DA",
          fontFamily: 'Montserrat', 
          border:"1.5px solid #4330DA", 
          marginTop:"35px",
          marginLeft:"20px"
        }}
        onClick={() => history.push(`/selectParty/${storedEventCode}`)}
      >
        Back
      </Button>
      <Button
        className="rsvpSubmitButton"
        variant="contained"
        style={{
          textTransform: 'none',
          backgroundColor: '#4330DA',
          fontFamily: 'Montserrat',
          color: 'white',
          marginTop: '35px',
          marginLeft: '20px',
        }}
        onClick={() => history.push(`/reminders/${partyGuests[0].party_id}`)}
      >
        Next
      </Button>
      </div>
    </>
  );
}

export default RsvpPage;
