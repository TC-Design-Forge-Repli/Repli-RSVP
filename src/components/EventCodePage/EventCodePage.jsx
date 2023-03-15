import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//mui imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Container from '@mui/material/Container';


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
    <>

    <div>
      <body style={{
          backgroundImage:"url('./images/hearts.jpg')"
      }}>
        
      </body>
    </div>
     
          
          <h1>Welcome to Repli</h1>
          <h3>RSVP here for the big day.</h3>

        <form>
          <TextField
            id="outlined"
            className="eventCodeInput"
            required
            value={eventCode}
            label="Event Code"
            sx={{
              "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "#4330DA" },
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset":{borderColor:"#4330DA"}
              },
              "& label.Mui-focused":{color:"#4330DA"},
              margin:"5px"
            }}
            // variant="standard"
            onChange={(event) => setEventCode(event.target.value)}
          />


          <Button
            className="eventCodeSubmitButton"
            style={{backgroundColor:"#4330DA"}}
            variant="contained"
            onClick={enterEventCode}>Enter
          </Button>
        </form>
     



      {/* <header>
        <div
          className='p-5 text-center bg-image'
          style={{ 
              //  backgroundImage: "url('https://media.gettyimages.com/id/165503175/vector/brunette-bride-and-groom.jpg?s=612x612&w=gi&k=20&c=AisK8hgse_fUNiJUAoo_UqqoY2WTWCJGY-QNCCuyyOk=')", 
              backgroundImage: "url('./images/hearts.jpg')", 
              // height: "100vh", 
               backgroundRepeat: "no-repeat" ,
               backgroundSize: "cover",
              //  minWidth: 200
          }}>
        </div>
      </header> */}
    </>
  );
}

export default EventCodePage;
