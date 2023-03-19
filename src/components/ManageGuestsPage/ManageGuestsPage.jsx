import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from '@mui/material/Button';
import { useState } from 'react';
import Swal from 'sweetalert2'
import { PieChart } from 'react-minimal-pie-chart';
import './ManageGuests.css';

function ManageGuestsPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const event_id = params.id;
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
      type: 'SAGA/FETCH_GUESTS_PER_PARTY',
      payload: event_id
    })
    dispatch({
      type: 'DELETED',
      payload: 'reset'
    })
  }, [deleted, event_id]);

  const deleteGuest = (guestId) => {
    dispatch({
      type: 'SAGA/DELETE_ONE_GUEST',
      payload: guestId
    })
  }

  const deleteParty = (partyId, partyName) => {
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

  const getResponseCount = () => {
    let yes = 0;
    let no = 0;
    let noResponse = 0;
    partyGuests.forEach((guest) => {
      if (guest.guest_response === true) {
        yes++;
      } else if (guest.guest_response === false) {
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

  const goToManageEvent = () => {
    const event_id = params.id;
    history.push(`/manageEvent/${event_id}`);
  }

  console.log('partyNames:', partyNames);
  console.log('eventPressed:', eventPressed);
  console.log('these are partyGuests', partyGuests);

  const responseCount = (party) => {
    let responseCount = 0;

    for (let guest of party.guests) {
      if (guest.guest_response !== null) {
        responseCount++;
      }
    }
    return responseCount;
  }

  const guestOfPartyCount = (party) => {
    let guestOfPartyCount = party.guests.length;
    return guestOfPartyCount;
  }

  const guestResponse = (guest) => {
    console.log('guest:', guest);

    if (guest.guest_response === true) {
      return 'Attending';
    }
    if (guest.guest_response === false) {
      return 'Not Attending';
    }
    if (guest.guest_response === null) {
      return 'No Response';
    }
  }

  return (
    <section>
      <h3>Manage Guest List</h3>
      {partyGuests.map((guest) => guest.guest_response !== null) && (
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
      {partyNames.map((party) => {
        return (
          <div className="partyAccordian">
            <IconButton color="error" onClick={() => deleteParty(party.id, party.name)}>
              <DeleteForeverIcon />
            </IconButton>
            <Accordion key={party.id}>

              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography sx={{ margin: '10px' }}>{party.name}</Typography>
                <Typography 
                  sx={{ margin: '10px' }}
                >
                  {`${responseCount(party)}/${guestOfPartyCount(party)} Responses`}
                </Typography>

              </AccordionSummary>
              {partyGuests.map((guest) => {
                if (guest.party_id === party.id) {
                  return (
                    <AccordionDetails sx={{ display: 'flex' }} key={guest.id}>
                      <IconButton color="error" onClick={() => deleteGuest(guest.id)}>
                        <DeleteForeverIcon />
                      </IconButton>
                      <Typography sx={{margin: "5px"}}>
                        {guest.guest_name}
                      </Typography>
                      <Typography sx={{margin: "5px"}}>
                        {guestResponse(guest)}
                      {/* {guest.guest_response === true ? ' Attending' : ' Not Attending'} */}
                      </Typography>
                      <Typography sx={{margin: "5px"}}>
                      {guest.meal_name}
                      </Typography>
                    </AccordionDetails>
                  );
                }
              })}
            </Accordion>
          </div>
        );
      })}

      <Button
        variant="outlined"
        onClick={goToManageEvent}
        style={{
          color: "#4330DA",
          fontFamily: "Montserrat",
          margin: "10px",
          borderColor: "#4330DA"
        }}
      >
        Back
      </Button>
    </section>
  );
}


export default ManageGuestsPage;