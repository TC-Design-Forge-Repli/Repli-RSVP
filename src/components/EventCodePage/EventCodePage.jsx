import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//mui imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function EventCodePage() {
 
  const [eventCode, setEventCode] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const enterEventCode = (event) => {
    event.preventDefault();
    console.log('event code:', eventCode);
    history.push('/selectParty/${eventCode}');
    //if the code is correct, navigate guest to SelectParty Page
    // history.push('/selectParty')
  }

  return (
    <form onSubmit={enterEventCode}>
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
        type="submit"
      >
        Enter
      </Button>
    </form>
  );
}

export default EventCodePage;
