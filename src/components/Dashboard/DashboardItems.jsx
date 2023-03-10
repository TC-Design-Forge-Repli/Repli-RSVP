import React, { useEffect, } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';


function DashboardItems({event}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleManageClick = () => {
    history.push('/manageEvent');
  }

  return (
    <div className="container">
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
  );
}
export default DashboardItems;