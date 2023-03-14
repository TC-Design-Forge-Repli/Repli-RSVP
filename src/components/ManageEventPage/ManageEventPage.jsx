import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './ManageEventPage.css';


function ManageEventPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const meals = useSelector((store) => store.meals);
  const params = useParams();
  const event_id = params.id;
  const eventPressed = useSelector((store) => store.eventPressed);
  const partyGuests = useSelector((store) => store.partyGuests);
  // event code state
  const [editEventCodeValue, setEditEventCodeValue] = useState(false);
  const [editedEventCode, setEditedEventCode] = useState('');
  // event name state
  const [editEventNameValue, setEditEventNameValue] = useState(false);
  const [editedEventName, setEditedEventName] = useState('');
  // event date state
  const [editEventDateValue, setEditEventDateValue] = useState(false);
  const [editedEventDate, setEditedEventDate] = useState('');
  // event location state
  const [editEventLocationValue, setEditEventLocationValue] = useState(false);
  const [editedEventLocation, setEditedEventLocation] = useState('');
  // event deadline state
  const [editEventDeadlineValue, setEditEventDeadlineValue] = useState(false);
  const [editedEventDeadline, setEditedEventDeadline] = useState('');

  useEffect(() => {
    dispatch({
      type: 'SAGA/FETCH_EVENT',
      payload: event_id
    })
    dispatch({
      type: 'SAGA/FETCH_MEALS',
      payload: event_id
    })
  }, [event_id])

  const goToManageGuestList = () => {
    history.push(`/manageGuests/${event_id}`);
  }

  const goToDashboard = () => {
    history.push('/dashboard');
  }

  // *** edit functions *** //
  // event name
  const editEventName = (singleEvent) => {
    // console.log(`edit: ${singleEvent.event_name}`);
    setEditedEventName(singleEvent.event_name);
    setEditEventNameValue(true);
  }
  // event code
  const editEventCode = (singleEvent) => {
    // console.log(`edit: ${singleEvent.event_code}`);
    setEditedEventCode(singleEvent.event_code);
    setEditEventCodeValue(true);
  }
  // event date
  const editEventDate = (singleEvent) => {
    // console.log(`edit: ${singleEvent.event_date}`);
    setEditedEventDate(singleEvent.event_date);
    setEditEventDateValue(true);
  }
  // event location
  const editEventLocation = (singleEvent) => {
    // console.log(`edit: ${singleEvent.event_location}`);
    setEditedEventLocation(singleEvent.event_location);
    setEditEventLocationValue(true);
  }
  // event deadline
  const editEventDeadline = (singleEvent) => {
    // console.log(`edit: ${singleEvent.event_deadline}`);
    setEditedEventDeadline(singleEvent.event_deadline);
    setEditEventDeadlineValue(true);
  }

  // *** handle change functions *** //
  // event name
  const handleEventNameChange = (event) => {
    setEditedEventName(event.target.value);
  }
  // event code
  const handleEventCodeChange = (event) => {
    setEditedEventCode(event.target.value);
  }
  // event date
  const handleEventDateChange = (event) => {
    setEditedEventDate(event.target.value);
  }
  // event location
  const handleEventLocationChange = (event) => {
    setEditedEventLocation(event.target.value);
  }
  // event deadline
  const handleEventDeadlineChange = (event) => {
    setEditedEventDeadline(event.target.value);
  }

  // *** save functions *** //
  // event name
  const saveEventName = () => {
    dispatch({
      type: 'SAGA/UPDATE_EVENT_NAME',
      payload: {
        id: event_id,
        event_name: editedEventName
      }
    })
    setEditEventNameValue(false);
  }
  // event code
  const saveEventCode = () => {
    dispatch({
      type: 'SAGA/UPDATE_EVENT_CODE',
      payload: {
        id: event_id,
        event_code: editedEventCode
      }
    });
    setEditEventCodeValue(false);
  }
  // event date
  const saveEventDate = () => {
    dispatch({
      type: 'SAGA/UPDATE_EVENT_DATE',
      payload: {
        id: event_id,
        event_date: editedEventDate
      }
    })
    setEditEventDateValue(false);
  }
  // event location
  const saveEventLocation = () => {
    dispatch({
      type: 'SAGA/UPDATE_EVENT_LOCATION',
      payload: {
        id: event_id,
        event_location: editedEventLocation
      }
    })
    setEditEventLocationValue(false);
  }
  // event deadline
  const saveEventDeadline = () => {
    dispatch({
      type: 'SAGA/UPDATE_EVENT_DEADLINE',
      payload: {
        id: event_id,
        event_deadline: editedEventDeadline
      }
    })
    setEditEventDeadlineValue(false);
  }

  return (
    <section>
      <Card>
        <CardContent>
          <div className="manageEventDetailsDiv">

            {/* event name */}
            <div id="eventNameDiv">
              <IconButton onClick={() => editEventName(eventPressed[0])}>
                {editEventNameValue ? <div></div> : <EditIcon />}
              </IconButton>
              <h2>
                {editEventNameValue ?
                  <input
                    type="text"
                    placeholder="New event name..."
                    value={editedEventName}
                    onChange={handleEventNameChange}
                  />
                  : eventPressed[0] && eventPressed[0].event_name}
              </h2>
              <IconButton onClick={saveEventName}>
                {editEventNameValue ? <CheckIcon /> : <div></div>}
              </IconButton>
            </div>

            {/* event code */}
            <div className="paragraphDiv">
              <IconButton onClick={() => editEventCode(eventPressed[0])}>
                {editEventCodeValue ? <div></div> : <EditIcon />}
              </IconButton>
              <p>Event Code: {editEventCodeValue ?
                <input
                  type="text"
                  placeholder="New event code..."
                  value={editedEventCode}
                  onChange={handleEventCodeChange}
                />
                : eventPressed[0] && eventPressed[0].event_code}
              </p>
              <IconButton onClick={saveEventCode}>
                {editEventCodeValue ? <CheckIcon /> : <div></div>}
              </IconButton>
            </div>

            {/* event date */}
            <div className="paragraphDiv">
              <IconButton onClick={() => editEventDate(eventPressed[0])}>
                {editEventDateValue ? <div></div> : <EditIcon />}
              </IconButton>
              <p>Date: {editEventDateValue ? 
                <input
                  type="date"
                  // placeholder="New event date"
                  value={editedEventDate}
                  onChange={handleEventDateChange}
                /> 
                : new Date(eventPressed[0] && eventPressed[0].event_date).toDateString('en-US')}
              </p>
              <IconButton onClick={saveEventDate}>
                {editEventDateValue ? <CheckIcon /> : <div></div>}
              </IconButton>
            </div>

            {/* event location */}
            <div className="paragraphDiv">
              <IconButton onClick={() => editEventLocation(eventPressed[0])}>
              {editEventLocationValue ? <div></div> : <EditIcon />}
              </IconButton>
              <p>Location: {editEventLocationValue ? 
                <input
                  type="text"
                  placeholder="New event location..."
                  value={editedEventLocation}
                  onChange={handleEventLocationChange}
                /> 
                : eventPressed[0] && eventPressed[0].event_location}
              </p>
              <IconButton onClick={saveEventLocation}>
                {editEventLocationValue ? <CheckIcon /> : <div></div>}
              </IconButton>
            </div>

            {/* event rsvp deadline */}
            <div className="paragraphDiv">
              <IconButton onClick={() => editEventDeadline(eventPressed[0])}>
              {editEventDeadlineValue ? <div></div> : <EditIcon />}
              </IconButton>
              <p>RSVP Deadline: {editEventDeadlineValue ? 
                <input
                  type="date"
                  value={editedEventDeadline}
                  onChange={handleEventDeadlineChange}
                /> 
                : new Date(eventPressed[0] && eventPressed[0].event_deadline).toDateString('en-US')}
              </p>
              <IconButton onClick={saveEventDeadline}>
                {editEventDeadlineValue ? <CheckIcon /> : <div></div>}
              </IconButton>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="manageMealOptionsDiv">
            <h3>Manage Meal Options</h3>
            {meals && meals.map(meal => {
              // Create an array of guests with the same meal_id
              // NOT WORKING
              const guestsWithSameMealId = partyGuests.filter(guest => guest.meal_id === meal.id);
              return (
                <div key={meal.id}>
                  <p>Name: {meal.meal_name}</p>
                  {/* NOT WORKING */}
                  <p>Number of Guests: {guestsWithSameMealId.length}</p>
                  <p>Description: {meal.description}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Button
        variant="outlined"
        onClick={goToDashboard}
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