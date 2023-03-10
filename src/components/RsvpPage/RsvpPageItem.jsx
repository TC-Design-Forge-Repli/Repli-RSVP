import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
//mui imports
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function RsvpPageItem({partyGuest, mealOptions}) {
    
    const [checked, setChecked] = useState(true);

    const dispatch = useDispatch();

    const updateResponse = (event) => {
        dispatch({
          type: 'SAGA/UPDATE_RESPONSE',
          payload: {
            guest_id: partyGuest.guest_id,
            response: false,
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
                        checked={true || ''}
                        onChange={() => setChecked(false)}
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
                    required
                    value={partyGuest.meal_id || ''}
                    onChange={updateMealChoice}
                    >
                    {mealOptions.map(mealOption => {
                        return (
                            <MenuItem key={mealOption.id} value={mealOption.id}>{mealOption.meal_name}</MenuItem>
                        )
                    })}
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
                        checked={false}
                        onChange={() => setChecked(true)}
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