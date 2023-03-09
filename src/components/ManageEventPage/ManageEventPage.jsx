import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import './ManageEventPage.css';


function ManageEventPage() {
  const dispatch = useDispatch();
  const eventDetails = useSelector((store) => store.eventDetails);
  const meals = useSelector((store) => store.meals);

  useEffect(() => {
    dispatch({
      type: 'SAGA/FETCH_EVENT'
    })
    dispatch({
      type: 'SAGA/FETCH_MEALS'
    })
  }, [])

  console.log('eventDetails:', eventDetails);
  console.log('meals:', meals);

  return (
    <section>
      <div className="manageEventDetailsDiv">
        <h2>Manage {eventDetails[0] && eventDetails[0].event_name}</h2>
        <p>Event Code: {eventDetails[0] && eventDetails[0].event_code}</p>
        <p>Date: {eventDetails[0] && eventDetails[0].event_date}</p>
        <p>Location: {eventDetails[0] && eventDetails[0].event_location}</p>
        <p>RSVP Deadline: {eventDetails[0] && eventDetails[0].event_deadline}</p>
      </div>
      <div className="manageMealOptionsDiv">
        <h3>Manage Meal Options</h3>
        {meals && meals.map(meal => {
          return (
            <div key={meal.id}>
              <p>Name: {meal.meal_name}</p>
              <p>Description: {meal.description}</p>
            </div>
          )
        })}
      </div>
      <Button
        variant="contained"
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