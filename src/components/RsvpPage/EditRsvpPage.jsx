import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import EditRsvpPageItem from './EditRsvpPageItem';
//mui imports
import Button from '@mui/material/Button';

function EditRsvpPage() {

    const partyGuests = useSelector(store => store.partyGuests);
    const mealOptions = useSelector(store => store.meals);
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
            <h2>Previous Answers</h2>
            {partyGuests.map(partyGuest => {
                return (
                    <EditRsvpPageItem  
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
                onClick={() => history.push(`/success/${partyGuests[0].party_id}`)}
            >
                Back
            </Button>
            <Button
                className="rsvpSubmitButton"
                variant="contained"
                type="submit"
                onClick={() => history.push(`/editReminders/${partyGuests[0].party_id}`)}
            >
                Next
            </Button>
            </div>
        </>
    )
}

export default EditRsvpPage;