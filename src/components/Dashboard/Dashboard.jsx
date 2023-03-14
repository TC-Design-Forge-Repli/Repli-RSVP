import React, { useEffect, } from 'react';
import { useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DashboardItems from './DashboardItems';


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

  const handleManageClick = () => {
    history.push('/manageEvent');
  }
  const test = () =>{
    console.log(events)
  }

  return (
    <div className="container">
      {
      events && events.map(event => {
        return <DashboardItems key={event.id} event={event}/>
      })
      }
    </div>
  );
}

{/* <div key={event.event_id}>
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
        </div> */}
export default Dashboard;