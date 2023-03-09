import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//mui imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function EventCodePage() {
 
  const dispatch = useDispatch();
  const history = useHistory();

  const [eventCode, setEventCode] = useState('');
  const doesEventCodeMatch = useSelector((store) => store.matchEventCode);


  useEffect(() => {
    matchEventCode();
  }, [doesEventCodeMatch])

  const matchEventCode = () => {
    if (doesEventCodeMatch === true) {
      history.push('/selectParty/${eventCode}');
      console.log('event code matches to an event');
      dispatch({
        type: 'DOES_EVENT_CODE_MATCH',
        payload:''
      })
    }
    else if (doesEventCodeMatch === false) {
      alert('this event code does not exist');
      console.log('event code does not match to an event');
      dispatch({
        type: 'DOES_EVENT_CODE_MATCH',
        payload:'' 
      })
    }
  }

  const enterEventCode = (event) => {
    event.preventDefault();
    console.log('event code entered:', eventCode);
    dispatch({
      type: 'SAGA/MATCH_EVENT_CODE',
      payload: eventCode
    })
    matchEventCode();
    setEventCode('');
    history.push(`/selectParty/${eventCode}`)
    dispatch({
      type: 'STORE_EVENT_CODE',
      payload: eventCode
    })
  }


  return (
    <form>
      <TextField
        className="eventCodeInput"
        required
        value={eventCode}
        label="Event Code"
        varient="standard"
        onChange={(event) => setEventCode(event.target.value)}
      />
      <Button
        className="eventCodeSubmitButton"
        variant="contained"
        onClick={enterEventCode}
      >
        Enter
      </Button>
    </form>
  );
}

export default EventCodePage;
