import React from 'react';
import { useHistory } from 'react-router-dom';
//mui components
import Button from '@mui/material/Button';


function AboutPage() {

  const history = useHistory();
  
  return (
    <div className="container">
      <div>
        <h2>Learn more about Repli</h2>

        <p>
          Introducing Repli, the ultimate event planning app for hosts and guests!
          With Repli, hosts can easily create and manage events, including important details like time, date, and meal options. 
          <br /> <br />
          Guests can quickly RSVP and select their preferred meal choices with just a few taps on their mobile device. 
          With the option to edit their responses, guests can easily manage their attendance and meal preferences. 
          <br /> <br />
          Whether you're planning a wedding or any other event, Repli is the must-have app for seamless event planning and coordination. 
          Try Repli today and experience stress-free event planning today!
        </p>

        <Button
          type="back"
          style={{
            textTransform: 'none',
            backgroundColor: '#4330DA',
            fontFamily: 'Montserrat',
            color: 'white',
            marginTop: '35px',
            marginLeft: '20px',
            display: 'flex',
            justifyContent: 'center'
          }}
          onClick={() => history.push(`/registration`)}
      >
        Sign up to host your own event
      </Button> 
      </div>
    </div>
  );
}

export default AboutPage;
