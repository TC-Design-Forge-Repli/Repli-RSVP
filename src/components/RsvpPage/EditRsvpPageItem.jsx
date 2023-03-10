import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
//mui imports
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function EditRsvpPageItem({partyGuest}) {

    const [checked, setChecked] = useState(partyGuest.response);
    const dispatch = useDispatch();

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
        
        </>
    )
}

export default EditRsvpPageItem;

