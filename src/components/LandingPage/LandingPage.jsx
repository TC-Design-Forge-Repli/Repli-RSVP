import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

import connor from './images/connor.jpg';
import HappyGirl from './images/HappyGirl.jpeg';
import Hearts from './images/Hearts.jpeg';
import ManyHearts from './images/ManyHearts.jpeg';
import FlowersHearts from './images/FlowersHearts.jpeg';
import modConnor from './images/modConnor.jpg';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';


//MUI Imports
import { Grid, Typogrpahy, Button, Box, Stack, Mask } from '@mui/material';

function LandingPage() {
  // const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
      <>

<Box 
      sx={{
        backgroundImage: `url(${modConnor})`,
        // backgroundImage: `url(${HappyGirl})`,
        // backgroundImage: `url(${Hearts})`,
        // backgroundImage: `url(${ManyHearts})`,
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
      // height:'60vh',
     }}
 >

{/* <Stack direction="column" spacing={2}> */}
       <Button
            className="moveToEventCodePage"
            style={{backgroundColor:"#4330DA", marginTop:"25px", marginLeft:"20px"}}
            variant="contained"
            onClick={() => history.push('/eventCode')}>I'm a guest
          </Button>

          <Button
            className="moveToEventCodePage"
            style={{backgroundColor:"#4330DA", marginTop:"25px", marginLeft:"25px"}}
            variant="contained"
            onClick={() => history.push('/dashboard')}>I'm getting married!
          </Button>
  {/* </Stack> */}
  </Box>
  </Box>
  







      </>

   
      
    );
  }
  
  export default LandingPage;
      

   
    
    