import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from 'react';
import Swal from 'sweetalert2'


function ManageGuestsPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const partyNames = useSelector((store) => store.partyNames);
  const eventPressed = useSelector((store) => store.eventPressed);
  const partyGuests = useSelector((store) => store.partyGuests);
  const deleted = useSelector((store) => store.deleted);
  const [swalProps, setSwalProps] = useState({});

  useEffect(() => {
    dispatch({
      type: 'SAGA/FETCH_PARTY_NAMES',
      payload: eventPressed[0] && eventPressed[0].event_code
    })
    dispatch({
      type: 'SAGA/FETCH_ALL_GUESTS'
    })
    dispatch({
      type: 'DELETED',
      payload: 'reset'
    })
  }, [deleted]);
  const deleteGuest = (guestId) => {
    dispatch({
      type: 'SAGA/DELETE_ONE_GUEST',
      payload: guestId
    })
  }
  const deleteParty = (partyId, partyName) =>{
    Swal.fire({
      title: `Are you sure you want to Delete ${partyName}?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
        dispatch({
          type: 'SAGA/DELETE_ONE_PARTY',
          payload: partyId
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  const onConfirm = () =>{
    console.log('confirm')
  }
  const onCancel = () =>{
    console.log('cancel')
  }
  console.log('partyNames:', partyNames);
  console.log('eventPressed:', eventPressed);

  return (
    <section>
      {partyNames.map((party) => {
        return (
          <Accordion key={party.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{party.name}</Typography>
              <IconButton color="error" onClick={() => deleteParty(party.id, party.name)}>
                <DeleteForeverIcon />
              </IconButton>
              
              
            </AccordionSummary>
            {partyGuests.map((guest) => {
              if (guest.party_id === party.id) {
                return (
                  <AccordionDetails key={guest.id}>
                    <Typography>
                      {guest.name}
                      <IconButton color="error" onClick={() => deleteGuest(guest.id)}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </Typography>
                  </AccordionDetails>
                )
              }
            })}
          </Accordion>
        )
      })}
    </section>
  )
}


export default ManageGuestsPage;