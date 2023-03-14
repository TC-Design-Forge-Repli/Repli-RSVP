import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

//MUI Imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';








// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  










  const onLogin = (event) => {
    history.push('/login');
  };

  return (
<>
    <header style={{ paddingLeft: 0 }}>
    <div
      className='p-5 text-center bg-image'
      // style={{backgroundImage:"url(./images/hotairBalloon.png)"}}

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





{/* 
            <a className='btn btn-outline-light btn-lg' href='#!' role='button'>
              Enter Your Event Code Here
            </a> */}
          </div>
        </div>
      {/* </div> */}
    </div>
  </header>
  </>

  
  
    // <div className="container">
    //   <h2>{heading}</h2>
    //   <Box
    //   sx={{
    //     width: 300,
    //     height: 300,
    //     backgroundColor: 'primary.dark',
    //     '&:hover': {
    //       backgroundColor: 'primary.main',
    //       opacity: [0.9, 0.8, 0.7],
    //     },
    //   }}
    // />

    //   <div className="grid">
    //     <div className="grid-col grid-col_8">
    //       {/*  */}
    //     </div>
    //     <div className="grid-col grid-col_4">
    //       <RegisterForm />

    //       <center>
    //         <h4>Already a Member?</h4>
    //         <button className="btn btn_sizeSm" onClick={onLogin}>
    //           Login
    //         </button>
    //       </center>
    //     </div>
    //   </div>
    // </div>
  );
}

export default LandingPage;
