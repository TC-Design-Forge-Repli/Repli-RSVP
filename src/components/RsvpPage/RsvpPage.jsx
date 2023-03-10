import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import RsvpPageItem from './RsvpPageItem';
//mui imports
import Button from '@mui/material/Button';

function RsvpPage() {

  const partyGuests = useSelector(store => store.partyGuests);
  const party_name = partyGuests.party_name;
  const mealOptions = useSelector(store => store.meals);
  const storedEventCode = useSelector(store => store.storeNavigation.storeEventCode);
  const storedPartyId = useSelector(store => store.storeNavigation.storePartyId);
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const party_id = params.id;
    dispatch({
      type: 'SAGA/FETCH_PARTY_GUESTS',
      payload: params.id
    })
    dispatch({
      type: 'SAGA/FETCH_MEALS',  
    })
    dispatch({
      type: 'STORE_PARTY_ID',
      payload: {party_id: params.id}
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
              mealOptions={mealOptions}
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
