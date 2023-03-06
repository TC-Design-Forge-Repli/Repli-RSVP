import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


// MUI Imports
import Button from '@mui/material/Button';


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
    <div>
      <h4>Welcome, please select your party:</h4>


    {/* Party Names Listed */}
      <div>
        {partyNames.map(partyName => (
          <Button 
            key={partyName.id}
            className="PartyNameButton"
            type="name"
            variant="contained" 
            size="small">
            {partyName.name}
          </Button>
        ))}
      </div>



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
