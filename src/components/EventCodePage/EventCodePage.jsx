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
      history.push(`/selectParty/${eventCode}`);
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
    console.log('event code entered:', eventCode);
    dispatch({
      type: 'SAGA/MATCH_EVENT_CODE',
      payload: eventCode
    })
    matchEventCode(eventCode);
    dispatch({
      type: 'STORE_EVENT_CODE',
      payload: eventCode
    })
  }


  return (


    <header style={{ paddingLeft: 0 }}>
    <div
      className='p-5 text-center bg-image'
      // style={{backgroundImage:"url(./images/repliHero.jpg)"}}

      style={{ backgroundImage: "url('https://media.gettyimages.com/id/165503175/vector/brunette-bride-and-groom.jpg?s=612x612&w=gi&k=20&c=AisK8hgse_fUNiJUAoo_UqqoY2WTWCJGY-QNCCuyyOk=')", 
               height: 800, 
               backgroundRepeat: "no-repeat" }}
    >
      {/* <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}> */}
        <div className='d-flex justify-content-center align-items-center h-100'>
          <div className='text-white'>
            <h1 className='mb-3'>Welcome to Repli...</h1>
            <h4 className='mb-3'>RSVP here for the big day.</h4>

            <TextField
          // required
          id="outlined"
          label="Enter your event code"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "#4330DA", backgroundColor:"#E34973"},
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset":{borderColor:"#4330DA"}
            },
            "& label.Mui-focused":{color:"#4330DA"},
            margin:"5px"
          }}
          // defaultValue="Email"
          // value={email}
          // onChange={(event) => setEmail(event.target.value)}
        />
        </div>
        </div>
      </div>


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
