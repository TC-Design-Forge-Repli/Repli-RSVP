import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
//mui imports
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

function RsvpPage() {

  const [checked, setChecked] = React.useState(true);
  const [mealChoice, setMealChoice] = useState('');
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const partyNames = useSelector(store => store.partyNames);
  console.log('party_id', partyNames)

  useEffect(() => {
    dispatch({
      type: 'SAGA/FETCH_PARTY_GUESTS',
      payload: params.id
    })
  }, [params.id])

  const addResponse = (event) => {
    event.preventDefault();
    console.log('here are your responses:', checked, mealChoice)
    dispatch({
      type: 'SAGA/SET_RESPONSE',
      payload: {
        response: checked,
        meal_id: mealChoice
      }
    })
  }

  return (
    <form onSubmit={addResponse}>
      {/* <h2>{party.name}</h2> */}
      {/* need to map through a party and have the following things:
              - guest name (map through guest reducer for specific party)
              - ✅ drop down menu for response or switch or toggle
              - drop down menu for meal options (need to map through meals reducer for options to show up)*/}
            
      
      
      <FormGroup>
      <FormControlLabel 
        control={
        <Switch
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />} 
        label={`${checked ? 'Politely Accept' : 'Regretfully Decline'}`}
      />
      </FormGroup>

      <FormControl sx={{ m: 1, minWidth: 85 }}>
       <InputLabel id="demo-simple-select-helper-label">Meals</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={mealChoice}
          onChange={(event) => setMealChoice(event.target.value)}
        >
          <MenuItem value={1}>Option 1</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
        </Select>
      </FormControl>
      
      <div>
      <Button
        className="backToSelectPartyButton"
        variant="outlined"
        onClick={() => history.push(`/selectParty/{eventCode}`)}
      >
        Back
      </Button>
      <Button
        className="rsvpSubmitButton"
        variant="contained"
        type="submit"
      >
        Next
      </Button>
      </div>
    </form>
  );
}

export default RsvpPage;
