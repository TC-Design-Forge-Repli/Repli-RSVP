import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


function CreateEventPage() {
  
  const history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const isEventCodeUnique = useSelector((store) => store.isEventCodeUnique)
  const [eventTitle, setEventTitle] = useState('');
  const [eventCode, setEventCode] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [rsvpCloseDate, setRsvpCloseDate] = useState('');
  const backButton = () =>{
    history.push('/dashboard')
  }
  useEffect(() => {
    checkEventCode();
  }, [isEventCodeUnique]);
 
  const checkEventCode = () =>{
      if(isEventCodeUnique === true){
        history.push('/addGuests')
        console.log('true')
        dispatch({
          type: 'IS_EVENT_CODE_UNIQUE',
          payload:''
        })
      }
      else if(isEventCodeUnique === false){
        alert('Please Pick a unique event code!')
        console.log('false')
        dispatch({
          type: 'IS_EVENT_CODE_UNIQUE',
          payload:''
        })
      }
  }
  const nextButton = () =>{
    dispatch({
      type: 'SET_EVENT_DETAILS',
      payload: {
        eventTitle,
        eventCode,
        date,
        location,
        rsvpCloseDate
      }
    })
    dispatch({
      type: 'SAGA/CHECK_EVENT_CODE',
      payload: eventCode
    })
    checkEventCode()
  }
  return (
    <div>
      <div>What is the event's name?</div>
      <TextField 
      required
      id="outlined-required"
      label="Required"
      value={eventTitle}
      onChange={(event) => setEventTitle(event.target.value)}
      />
      <div>Enter in a unique event code.</div>
      <TextField 
      required
      id="outlined-required"
      label="Required"
      value={eventCode}
      onChange={(event) => setEventCode(event.target.value)}
      />
      <div>What is the date the event will take place?</div>
      <TextField 
      required
      type="date"
      id="outlined-required"
      // label="Required"
      value={date}
      onChange={(event) => setDate(event.target.value)}
      />
      <div>Where is the event taking place?</div>
      <TextField 
      required
      id="outlined-required"
      label="Required"
      value={location}
      onChange={(event) => setLocation(event.target.value)}
      />
      <div>When do you want this event to be closed?</div>
      <TextField 
      required
      type="date"
      id="outlined-required"
      // label="Required"
      value={rsvpCloseDate}
      onChange={(event) => setRsvpCloseDate(event.target.value)}
      />
      <Button 
      className='backButton' 
      variant="outlined"
      onClick={backButton}
      >Back</Button>
      {
        (eventTitle != '' && eventCode != '' && date != '' && location != '' && rsvpCloseDate != '') ? <Button 
        className='nextButton' 
        variant="contained"
        onClick={nextButton}
        >Next</Button>
        : <div></div>
      }
  
    </div>
  );
}

export default CreateEventPage;
