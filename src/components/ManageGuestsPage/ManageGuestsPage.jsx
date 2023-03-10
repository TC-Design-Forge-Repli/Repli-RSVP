import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';


function ManageGuestsPage() {
  const dispatch = useDispatch();
  const partyNames = useSelector((store) => store.partyNames);
  const eventDetails = useSelector((store) => store.eventDetails);
  const partyGuests = useSelector((store) => store.partyGuests);

  useEffect(() => {
    dispatch({
      type: 'SAGA/FETCH_PARTY_NAMES',
      payload: eventDetails[0] && eventDetails[0].event_code
    })
    dispatch({
      type: 'SAGA/FETCH_ALL_GUESTS'
    })
  }, []);

  console.log('partyNames:', partyNames);
  console.log('eventDetails:', eventDetails);

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
            </AccordionSummary>
            {partyGuests.map((guest) => {
              if (guest.party_id === party.id) {
                return (
                  <AccordionDetails key={guest.id}>
                    <Typography>
                      {guest.name}
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