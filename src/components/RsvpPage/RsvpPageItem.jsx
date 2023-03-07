import React, { useState } from 'react';

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
    const [mealChoice, setMealChoice] = useState('');

    return (
        <form>
            <h4>{partyGuest.guest_name}</h4>

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
        </form>
    )
}

export default RsvpPageItem;