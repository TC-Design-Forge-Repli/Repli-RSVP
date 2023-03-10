import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import './ManageEventPage.css';


function ManageEventPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const eventDetails = useSelector((store) => store.eventDetails);
  const meals = useSelector((store) => store.meals);
  const partyGuests = useSelector((store) => store.partyGuests);

  useEffect(() => {
    dispatch({
      type: 'SAGA/FETCH_EVENT'
    })
    dispatch({
      type: 'SAGA/FETCH_MEALS'
    })
    dispatch({
      type: 'SAGA/FETCH_ALL_GUESTS'
    })
  }, [])

  const goToManageGuestList = () => {
    history.push('/manageGuests');
  }

  // *** edit functions *** //
  // event code
  const editEventCode = (singleEvent) => {
    console.log(`edit ${singleEvent.event_code}:`);
  }
  // event date
  const editEventDate = (singleEvent) => {
    console.log(`edit ${singleEvent.event_date}:`);
  }
  // event location
  const editEventLocation = (singleEvent) => {
    console.log(`edit ${singleEvent.event_location}:`);
  }
  // event deadline
  const editEventDeadline = (singleEvent) => {
    console.log(`edit ${singleEvent.event_deadline}:`);
  }

  return (
    <section>
      {eventDetails.map((singleEvent) => {
        return (
          <div key={singleEvent.id} className="manageEventDetailsDiv">
            <h2>{singleEvent.event_name}</h2>
            {/* event code */}
            <div className="paragraphDiv">
              <IconButton onClick={() => editEventCode(singleEvent)}>
                <EditIcon />
              </IconButton><p>Event Code: {singleEvent.event_code}</p>
            </div>
            {/* event date */}
            <div className="paragraphDiv">
              <IconButton onClick={() => editEventDate(singleEvent)}>
                <EditIcon />
              </IconButton><p>Date: {new Date(singleEvent.event_date).toDateString('en-US')}</p>
            </div>
            {/* event location */}
            <div className="paragraphDiv">
              <IconButton onClick={() => editEventLocation(singleEvent)}>
                <EditIcon />
              </IconButton><p>Location: {singleEvent.event_location}</p>
            </div>
            {/* event rsvp deadline */}
            <div className="paragraphDiv">
              <IconButton onClick={() => editEventDeadline(singleEvent)}>
                <EditIcon />
              </IconButton><p>RSVP Deadline: {new Date(singleEvent.event_deadline).toDateString('en-US')}</p>
            </div>
          </div>
        )
      })}
      <div className="manageMealOptionsDiv">
        <h3>Manage Meal Options</h3>
        {meals && meals.map(meal => {
          // Create an array of guests with the same meal_id
          const guestsWithSameMealId = partyGuests.filter(guest => guest.meal_id === meal.id);
          return (
            <div key={meal.id}>
              <p>Name: {meal.meal_name}</p>
              <p>Number of Guests: {guestsWithSameMealId.length}</p>
              <p>Description: {meal.description}</p>
            </div>
          )
        })}
      </div>

      <Button 
          variant="outlined"
          style={{
            color: "#4330DA",
            fontFamily: "Montserrat",
            margin: "10px",
            borderColor: "#4330DA"
          }}
        >
          Dashboard
        </Button>
      <Button
        variant="contained"
        onClick={goToManageGuestList}
        style={{
          backgroundColor: "#4330DA",
          fontFamily: "Montserrat",
          margin: "10px"
        }}
      >
        Manage Guest List
      </Button>
    </section>
  );
}


export default ManageEventPage;