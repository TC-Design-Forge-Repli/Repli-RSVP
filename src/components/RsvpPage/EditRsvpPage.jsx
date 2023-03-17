import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import EditRsvpPageItem from './EditRsvpPageItem';
//mui imports
import Button from '@mui/material/Button';

function EditRsvpPage() {

    const partyGuests = useSelector(store => store.partyGuests);
    const storePartyId = useSelector(store => store.storeNavigation.storePartyId);
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
                    />
                )
            })}

            <div>
            <Button
                className="backToSelectPartyButton"
                variant="outlined"
                onClick={() => history.push(`/success/${partyGuests[0].party_id}`)}
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
                style={{
                  backgroundColor:"#4330DA", 
                  textTransform:"none", 
                  marginTop:"10px",
                  marginLeft:"20px",
                  marginRight:"20px"
                }}

                // onClick={() => history.push(`/editReminders/${partyGuests[0].party_id}`)}
                // server terminal message: GET route for partyGuests failed error: invalid input syntax for type integer: "undefined"
                // sends me here: http://localhost:3000/#/rsvp/undefined
                // console warnings: partyGuests.saga.js:21 fetchPartyGuests SAGA function failed Error: Request failed with status code 500
                // GET http://localhost:3000/api/partyGuests/undefined 500 (Internal Server Error)
               
               
                // onClick={() => {console.log('is editRsvpPage Next button working?', storePartyId.party_id)}}
                // console response: is editRsvpPage Next button working? {party_id: '1'}


                // onClick={() => history.push(`editReminders/${storePartyId.party_id}`)}
                // sends me here: http://localhost:3000/#/editRsvp/editReminders/[object%20Object]

            >Next
            </Button>
            </div>
        </>
    )
}

export default EditRsvpPage;