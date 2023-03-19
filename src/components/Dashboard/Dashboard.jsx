import React, { useEffect, } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DashboardItems from './DashboardItems';
import Button from '@material-ui/core/Button';
import './Dashboard.css'


function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const events = useSelector(store => store.dashboard);
  const deleted = useSelector((store) => store.deleted);

  // this component doesn't do much to start, just renders some user reducer info to the DOM

  useEffect(() => {
    dispatch({
      type: 'SAGA/FETCH_ALL_DATA'
    })
  }, [deleted])

  const createEvent = () => {
    history.push("/createEvent")
  }

  return (
    <div className="container">
      {/* {guest.guest_response === true ? ' Attending' : ' Not Attending'} */}
      {events && events.length === 0 ? 
      <div>
        <div className="congrats">Congratulations!</div>
        <div>Thank you for choosing Repli.</div>
        <br/>
        <div>Lets Create An Event</div>
        <div>For a successful event creation you will want to have the following available:</div>
        <ul>
          <li>Event Details</li>
          <li>Guest List</li>
          <li>Meal Options</li>
        </ul>

      </div> : <div></div>
      }
      {
        events && events.map(event => {
          return <DashboardItems key={event.id} event={event} />
        })
      }
      <br/>
      <div>
        {events && events.length === 0 ? 
        <div>Press The CREATE EVENT button to get started</div> : <div></div> }
        <Button
          variant="contained"
          style={{
            color: "white",
            backgroundColor: "#4330DA",
            fontFamily: "Montserrat",
            margin: "10px",
            left: "180px",
          }}
          onClick={createEvent}
        >
          Create Event +
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;