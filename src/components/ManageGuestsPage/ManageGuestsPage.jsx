import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';


function ManageGuestsPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const partyNames = useSelector((store) => store.partyNames);
  const eventPressed = useSelector((store) => store.eventPressed);
  const partyGuests = useSelector((store) => store.partyGuests);

  useEffect(() => {
    dispatch({
      type: 'SAGA/FETCH_PARTY_NAMES',
      payload: eventPressed[0] && eventPressed[0].event_code
    })
    dispatch({
      type: 'SAGA/FETCH_ALL_GUESTS'
    })
  }, []);

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