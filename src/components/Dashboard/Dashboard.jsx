import React, { useEffect, } from 'react';
import { useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const events = useSelector(store => store.dashboardReducer);

  useEffect(() => {
    dispatch({
      type: 'SAGA/FETCH_ALL_DATA'
    })
  }, [])

  const handleManageClick = () => {
    history.push('/manageEvent');
  }

  return (
    <div className="container">
      {events.map((event) => (
        <div key={event.event_id}>
          <h2>{event.event_name}</h2>
          <p>{event.event_date}</p>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#4330DA",
              fontFamily: "Montserrat",
              margin: "10px"
            }}
            onClick={handleManageClick}
          >
            Manage 
          </Button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;