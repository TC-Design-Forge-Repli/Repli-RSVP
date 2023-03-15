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
  






 {/* <Grid item xs={6}>
        <img src={connor}
             style={{ 
              filter: 'grayscale(100%)' ,
              marginTop:"-40px",
              marginBottom:"-50px",
              paddingBottom:"-100px",
              verticalAlign:"bottom"
             }}/>
      </Grid> */}

{/* <div>
      <Grid>
          <Button
            className="moveToEventCodePage"
            style={{backgroundColor:"#4330DA"}}
            variant="contained"
            onClick={() => history.push('/eventCode')}>I'm a guest
          </Button>

          <Button
            className="moveToEventCodePage"
            style={{backgroundColor:"#4330DA"}}
            variant="contained"
            onClick={() => history.push('/eventCode')}>I'm getting married!
          </Button>
      </Grid> 
  

</div> */}
      
      </>

   
      
    );
  }
  
  export default LandingPage;
      

   
    
    // <div className="container">
    //   <h2>{heading}</h2>

    //   <div className="grid">
    //     <div className="grid-col grid-col_8">
    //       <p>
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
    //         id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
    //         ut ex molestie blandit. Etiam et turpis sit amet risus mollis
    //         interdum. Suspendisse et justo vitae metus bibendum fringilla sed
    //         sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
    //         elementum eget. Praesent efficitur eros vitae nunc interdum, eu
    //         interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
    //         Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
    //         luctus. Duis a sapien metus.
    //       </p>

    //       <p>
    //         Praesent consectetur orci dui, id elementum eros facilisis id. Sed
    //         id dolor in augue porttitor faucibus eget sit amet ante. Nunc
    //         consectetur placerat pharetra. Aenean gravida ex ut erat commodo, ut
    //         finibus metus facilisis. Nullam eget lectus non urna rhoncus
    //         accumsan quis id massa. Curabitur sit amet dolor nisl. Proin
    //         euismod, augue at condimentum rhoncus, massa lorem semper lacus, sed
    //         lobortis augue mi vel felis. Duis ultrices sapien at est convallis
    //         congue.
    //       </p>

    //       <p>
    //         Fusce porta diam ac tortor elementum, ut imperdiet metus volutpat.
    //         Suspendisse posuere dapibus maximus. Aliquam vitae felis libero. In
    //         vehicula sapien at semper ultrices. Vivamus sed feugiat libero. Sed
    //         sagittis neque id diam euismod, ut egestas felis ultricies. Nullam
    //         non fermentum mauris. Sed in enim ac turpis faucibus pretium in sit
    //         amet nisi.
    //       </p>
    //    </div>
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
