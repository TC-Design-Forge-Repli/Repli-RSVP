import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//mui imports
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function RsvpPageItem({partyGuest}) {
    
    const [checked, setChecked] = useState(true);
    const dispatch = useDispatch();

    const partyNames = useSelector((store) => store.partyNames);
    

    const updateResponse = (event) => {
        dispatch({
          type: 'SAGA/UPDATE_RESPONSE',
          payload: {
            guest_id: partyGuest.guest_id,
            response: event.target.checked,
            meal_id: null
          }
        })
    }

    const updateMealChoice = (event) => {
        console.log('meal choice:', event.target.value)
        dispatch({
            type: 'SAGA/UPDATE_MEAL',
            payload: {
                guest_id: partyGuest.guest_id,
                response: true, 
                meal_id: event.target.value
            }
        })
    }

    return (
        <>
            <h4>{partyGuest.guest_name}</h4>

        {checked ?
        <>
            {/* show toggle(switch) and meal drop down if guest is accepting the invitation*/}
            <form onChange={updateResponse}>
                <FormGroup>
                <FormControlLabel 
                    control={
                    <Switch
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                    />} 
                    label={`${checked ? 'Politely Accept' : 'Regretfully Decline' }`}
                />
                </FormGroup>
            </form>

            <form>
                <FormControl sx={{ m: 1, minWidth: 95 }}>
                    <InputLabel id="demo-simple-select-helper-label">Meals</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={''}
                    onChange={updateMealChoice}
                    >
                    <MenuItem value={1}>Option 1</MenuItem>
                    <MenuItem value={2}>Option 2</MenuItem>
                    </Select>
                </FormControl>
            </form>
        </>

        :

        // only show toggle(switch) if they are currently declining the invitation
         <form onChange={updateResponse}>
                <FormGroup>
                <FormControlLabel 
                    control={
                    <Switch
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                    />} 
                    label={`${checked ? 'Politely Accept' : 'Regretfully Decline' }`}
                />
                </FormGroup>
            </form>
        
            }
        </>
    )
}

export default RsvpPageItem;