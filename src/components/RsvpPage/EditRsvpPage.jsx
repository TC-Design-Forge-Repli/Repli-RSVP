import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import EditRsvpPageItem from './EditRsvpPageItem';
//mui imports
import Button from '@mui/material/Button';

function EditRsvpPage() {

    const partyGuests = useSelector(store => store.partyGuests);
    const storedPartyId = useSelector(store => store.storeNavigation.storePartyId);
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
  
    useEffect(() => {
      const party_id = params.id;
      dispatch({
        type: 'SAGA/FETCH_PARTY_GUEST_RESPONSES',
        payload: party_id
      })
      dispatch({
        type: 'STORE_PARTY_ID'
      })
    }, [params.id])


    return (
        <>
            <h3>Previous Answers</h3>
            {partyGuests.map(partyGuest => {
                return (
                    <EditRsvpPageItem  
                    key={partyGuest.guest_id}
                    partyGuest={partyGuest}
                    />
                )
            })}

            <div>
            <Button
                className="backToSelectPartyButton"
                variant="outlined"
                onClick={() => history.push(`/success/${storedPartyId}`)}
            >
                Back
            </Button>
            <Button
                className="rsvpSubmitButton"
                variant="contained"
                type="submit"
                onClick={() => history.push(`/editReminders/${storedPartyId}`)}
            >
                Next
            </Button>
            </div>
        </>
    )
}

export default EditRsvpPage;