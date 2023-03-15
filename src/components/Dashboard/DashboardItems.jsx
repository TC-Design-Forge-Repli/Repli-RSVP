import React, { useEffect, } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import Swal from 'sweetalert2'
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function DashboardItems({ event }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleManageClick = () => {
    history.push(`/manageEvent/${event.event_id}`);
  }
  const deleteEvent = (eventId, eventName) => {
    Swal.fire({
      title: `Are you sure you want to Delete ${eventName}?`,
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
          type: 'SAGA/DELETE_ONE_EVENT',
          payload: eventId
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  return (
    <div key={event.id} className="container">
      <h2>{event.event_name}</h2>
      <p>{new Date(event.event_date).toDateString('en-US')}</p>
      <IconButton color="error" onClick={() => deleteEvent(event.event_id, event.event_name)}>
        <DeleteForeverIcon />
      </IconButton>
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