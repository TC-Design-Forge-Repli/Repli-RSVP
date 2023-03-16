import React, { useEffect, } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DashboardItems from './DashboardItems';
import Button from '@material-ui/core/Button';


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

  }

  return (
    <div className="container">
      {
        events && events.map(event => {
          return <DashboardItems key={event.id} event={event} />
        })
      }
      <Button
        variant="contained"
        style={{
          backgroundColor: "#4330DA",
          fontFamily: "Montserrat",
          margin: "10px",
          left: "250px",
        }}
        onClick={createEvent}
      >
        +
      </Button>
    </div>
  );
}

export default Dashboard;