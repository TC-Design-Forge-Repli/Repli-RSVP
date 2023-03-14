import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { PieChart } from 'react-minimal-pie-chart';

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


  const getResponseCount = () => {
    let yes = 0;
    let no = 0;
    let noResponse = 0;
    partyGuests.forEach((guest) => {
      if (guest.response === true) {
        yes++;
      } else if (guest.response === false) {
        no++;
      } else {
        noResponse++;
      }
    });
    return [
      {
        title: 'Accepted',
        value: yes,
        color: '#4caf50',
      },
      {
        title: 'Declined',
        value: no,
        color: '#f44336',
      },
      {
        title: 'No response',
        value: noResponse,
        color: 'gray',
      },
    ];
  };

  console.log('partyNames:', partyNames);
  console.log('eventPressed:', eventPressed);
  console.log('these are partyGuests', partyguests);
  


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
                    <Typography>{guest.name}</Typography>
                  </AccordionDetails>
                );
              }
            })}
          </Accordion>
        );
      })}
      <br/>
      <br/>
      {partyGuests.map((guest) => guest.response !== null) && (
        <div style={{ width: "400px", height: "300px" }}>
             <PieChart
                data={getResponseCount()}
                label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}`}
                labelStyle={{ fontSize: '4px', fontFamily: 'sans-serif' }}
                labelPosition={65}
                radius={40}
              />
        </div>
      )}
    </section>
  );
}


export default ManageGuestsPage;