import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


// MUI Imports
import Button from '@mui/material/Button';


function SelectPartyPage(props) {
 
  // const store = useSelector((store) => store);
  const dispatch= useDispatch();
  const history = useHistory();
  // const params = useParams();

  // useEffect(() => {
    const eventCode=params.id
  //   dispatch({
  //         type: 'SAGA/FETCH_PARTY_NAMES',
  //         payload: eventCode
  //   })
  // }, [params.id])





  return (
    <div>
      <h4>Welcome, please select your party:</h4>



{/* Create a UL/LI with buttons to list party names */}




    {/* Party Name Buttons */}
    <Button 
      className="PartyNameButton"
      type="name"
      variant="contained" 
      size="small">Mire
      </Button>




    {/* Back Button */}
    <Button 
      className="backToEventCodePage"
      type="back"
      variant="outlined" 
      onClick={() => history.push('/eventCode')}>Back
    </Button>
    </div>
  );
}

export default SelectPartyPage;
