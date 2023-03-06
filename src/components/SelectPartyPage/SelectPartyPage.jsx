import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './SelectPartyPage.css'

// MUI Imports
import Button from '@mui/material/Button';
import styled from "styled-components";
import { Grid } from "@mui/material";

// const PartyNameButton = styled.button
// `
//   .button-text {
//     text-transform: none;
//   }
//   `;

function SelectPartyPage() {


 
  const params = useParams();
  const dispatch= useDispatch();
  const history = useHistory();

  const partyNames = useSelector((store) => store.partyNames);

  

  useEffect(() => {
    const eventCode=params.id
    dispatch({
          type: 'SAGA/FETCH_PARTY_NAMES',
          payload: eventCode
    })
  }, [params.id])


  return (
    <>
      <h4 style={{marginLeft:"15px"}}>Welcome, please select your party:</h4>


    {/* Party Names Listed */}
      <div>
    <Grid container direction="column">
        {partyNames.map(partyName => (    
          <Button 
            key={partyName.id}
            className="PartyNameButton"
            type="name"
            variant="contained" 
            size="small"
            style={{backgroundColor:"#4330DA", 
                    textTransform:"none", 
                    marginTop:"10px",
                    marginLeft:"20px",
                    marginRight:"20px"
                  }}
            onClick={() => history.push('/rsvp')}>
            {partyName.name}
          </Button>
           ))}
    </Grid>
       
      </div>



    {/* Back Button */}
    <Button 
      className="backToEventCodePage"
      type="back"
      variant="outlined" 
      style={{color:"#4330DA", 
              border:"2px solid #4330DA", 
              marginTop:"25px",
              marginLeft:"20px"}}
      onClick={() => history.push('/eventCode')}>Back
    </Button>

    </>
  );
}

export default SelectPartyPage;
