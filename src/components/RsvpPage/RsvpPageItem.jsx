import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//mui imports
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from '@material-ui/core';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function RsvpPageItem({partyGuest}) {
    
    const [checked, setChecked] = useState(true);
    const mealOptions = useSelector(store => store.meals)
    const [activeStep, setActiveStep] = useState(2);
    const dispatch = useDispatch();
    
    
    const useStyles = makeStyles({
        switch: {
          // '& .MuiSwitch-thumb': {
          //   backgroundColor: "#4330DA",
          // },
          "& .Mui-checked": {
            color: "#4330DA"
            // transform: "translateX(25px) !important"
          },
          "& .MuiSwitch-track": {
            backgroundColor: "#4330DA !important"
          }
        },
        checked: {},
        track: {},
      });

    const classes= useStyles();
   

    const steps = [
      { label: '' },
      { label: '' },
      { label: '' },
      { label: '' },
      { label: '' },
  
    ];

    useEffect(() => {
        dispatch({
            type: 'SAGA/FETCH_MEALS',
            payload: partyGuest.event_id
          })
    }, [])

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
        // console.log('meal choice:', event.target.value)
        dispatch({
            type: 'SAGA/UPDATE_MEAL',
            payload: {
                guest_id: partyGuest.guest_id,
                response: true, 
                meal_id: event.target.value,
            }
        })
    }

    return (
      <>
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <h4>{partyGuest.guest_name}</h4>

            {checked ? (
            // show toggle(switch) and meal drop down if guest is accepting the invitation
              <>
                <form onChange={updateResponse}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                            className={classes.switch}
                          checked={true || ""}
                          onChange={() => setChecked(false)}
                        />
                    
                      }
                  label={`${
                    checked ? "Politely Accept" : "Regretfully Decline"
                  }`}
                    />
                  </FormGroup>
                </form>

            <form>
              <FormControl sx={{ m: 1, minWidth: 95 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Meals
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  required
                  value={partyGuest.meal_id || ""}
                  onChange={updateMealChoice}
                >
                  {mealOptions.map((mealOption) => {
                    return (
                      <MenuItem key={mealOption.id} value={mealOption.id}>
                        {mealOption.meal_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </form>
          </>
        ) : (
          // only show toggle(switch) if they are currently declining the invitation
          <form onChange={updateResponse}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch checked={false} onChange={() => setChecked(true)} />
                }
                label={`${checked ? "Politely Accept" : "Regretfully Decline"}`}
              />
            </FormGroup>
          </form>
        )}
      </>
    );
}

export default RsvpPageItem;