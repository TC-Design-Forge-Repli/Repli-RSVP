import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

//mui imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Grid, Typogrpahy, Box, Stack, Mask } from '@mui/material';

import connor from './images/connor.jpg';
import HappyGirl from './images/HappyGirl.jpeg';
import Hearts from './images/Hearts.jpeg';
import ManyHearts from './images/ManyHearts.jpeg';
import FlowersHearts from './images/FlowersHearts.jpeg'


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
      // console.log('event code matches to an event');
      dispatch({
        type: 'DOES_EVENT_CODE_MATCH',
        payload:''
      })
    }
    else if (doesEventCodeMatch === false) {
      alert('this event code does not exist');
      // console.log('event code does not match to an event');
      dispatch({
        type: 'DOES_EVENT_CODE_MATCH',
        payload:'' 
      })
    }
  }

  const enterEventCode = (event) => {
    // console.log('event code entered:', eventCode);
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

<Box
      sx={{
        // backgroundImage: `url(${ManyHearts})`,
        // backgroundImage: `url(${HappyGirl})`,
        // backgroundImage: `url(${Hearts})`,
        backgroundImage: `url(${FlowersHearts})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginTop:"-30px",
        minHeight: '100vh', // set the minimum height of the element to 100% of the viewport height
        // filter: 'grayscale(100%)' ,
        // mask:"rgba(0,0,0.6)"
      }}>
      
     <Box
     sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height:'60vh',
     }}
     
     >
      <Stack>
      <TextField 
      id="filled-basic"
      variant="filled"
      label="Event Code"
            sx={{
              backgroundColor: "#4330DA",
              textAlign:"center",
            
              '& .MuiInput-underline:after': {
                borderBottomColor: 'white',
              },
              '& .MuiInputLabel-root': {
                color: 'white',
              },
              '& .MuiFilledInput-input': {
                color: 'white',
              },
              "& .MuiFilledInput-root": {
              "& > fieldset": { borderColor: "white" },
              },
              "& .MuiFilledInput-root.Mui-focused": {
              "& > fieldset":{borderColor:"white"}
              },
              "& label.Mui-focused":{color:"white"},
              margin:"5px"
            }}
            // variant="standard"
            onChange={(event) => setEventCode(event.target.value)}
          />

          <Button
            className="eventCodeSubmitButton"
            style={{backgroundColor:"#4330DA", marginLeft:"50px", marginRight:"50px"}}
            variant="contained"
            onClick={enterEventCode}>Enter
          </Button>
          </Stack>
          </Box>
      </Box>   
    </>
  );
}

export default EventCodePage;
