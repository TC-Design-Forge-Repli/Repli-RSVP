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
  const meals = useSelector((store) => store.meals)
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
    dispatch({
      type: 'SAGA/FETCH_MEALS',
      payload: event_id
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
      } if (guest.guest_response === false) {
        no++;
      } else {
        noResponse++;
      }
    });
    let pieArray = [];
    if(yes != 0){
      pieArray.push(
        {
          title: 'Accepted',
          value: yes,
          color: '#4caf50',
        }
      )
    }
    if(no != 0){
      pieArray.push(
        {
          title: 'Declined',
          value: no,
          color: '#f44336',
        }
      )

    }
    if(noResponse != 0){
      pieArray.push(
        {
          title: 'No response',
          value: noResponse,
          color: 'gray',
        }
      )

    }
    return pieArray
    // if(yes != 0 && no != 0 && noResponse != 0){
    //   return [
    //     {
    //       title: 'Accepted',
    //       value: yes,
    //       color: '#4caf50',
    //     },
    //     {
    //       title: 'Declined',
    //       value: no,
    //       color: '#f44336',
    //     },
    //     {
    //       title: 'No response',
    //       value: noResponse,
    //       color: 'gray',
    //     },
    //   ];
    // }
    
  };
  const replaceMealIdWithMealName = (mealId) =>{
    for(let i = 0; i < meals.length; i++){
      if(meals[i].id === mealId){
        return meals[i].meal_name
      }
    }
  }
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
                      {guest.guest_response === true ? ' Attending' : ' Not Attending'}
                      </Typography>
                      <Typography sx={{margin: "5px"}}>
                      {replaceMealIdWithMealName(guest.meal_id)}
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