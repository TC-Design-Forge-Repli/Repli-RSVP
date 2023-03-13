import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './ManageEventPage.css';


function ManageEventPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const event_id = params.id

  const eventPressed = useSelector((store) => store.eventPressed)
  const meals = useSelector((store) => store.meals)

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

  return (
    <section>
      <Card>
        <CardContent>
          <div className="manageeventPressedDiv">
            <h2>Manage {eventPressed[0] && eventPressed[0].event_name}</h2>
            <p>Event Code: {eventPressed[0] && eventPressed[0].event_code}</p>
            <p>Date: {eventPressed[0] && new Date(eventPressed[0].event_date).toLocaleDateString()}</p>
            <p>Location: {eventPressed[0] && eventPressed[0].event_location}</p>
            <p>RSVP Deadline: {eventPressed[0] && new Date(eventPressed[0].event_deadline).toLocaleDateString()}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="manageMealOptionsDiv">
            <h3>Manage Meal Options</h3>
            {meals && meals.map(meal => {
              // Create an array of guests with the same meal_id
              // const guestsWithSameMealId = partyGuests.filter(guest => guest.meal_id === meal.id);
              return (
                <div key={meal.id}>
                  <p>Name: {meal.meal_name}</p>
                  {/* <p>Number of Guests: {guestsWithSameMealId.length}</p> */}
                  <p>Description: {meal.description}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
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