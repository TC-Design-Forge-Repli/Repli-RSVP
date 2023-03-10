import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import RsvpPageItem from './RsvpPageItem';
//mui imports
import Button from '@mui/material/Button';

function RsvpPage() {

  const partyGuests = useSelector(store => store.partyGuests);
  const storedEventCode = useSelector(store => store.storeNavigation.storeEventCode);
  const storedPartyId = useSelector(store => store.storeNavigation.storePartyId);
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const party_id = params.id;
    dispatch({
      type: 'SAGA/FETCH_PARTY_GUESTS',
      payload: party_id
    })
    dispatch({
      type: 'STORE_PARTY_ID',
      payload: {party_id: params.id}
    })
  }, [params.id])



  return (
    <>
      {/* <h2>{party.name}</h2> */}
      {/* need to map through a party and have the following things:
              - ✅ guest name (map through guest reducer for specific party)
              - ✅ drop down menu for response or switch or toggle
              - drop down menu for meal options (need to map through meals reducer for options to show up)*/}

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
      >
        Back
      </Button>
      <Button
        className="rsvpSubmitButton"
        variant="contained"
        type="submit"
        onClick={() => history.push(`/reminders/${storedPartyId}`)}
      >
        Next
      </Button>
      </div>
    </>
  );
}

export default RsvpPage;
