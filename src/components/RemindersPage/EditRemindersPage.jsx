import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';


// MUI Imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { makeStyles, Switch } from '@material-ui/core';


function EditRemindersPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();


    const storePartyId = useSelector(store => store.storeNavigation.storePartyId);
    const remindersToEdit = useSelector(store => store.remindersToEdit)

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


    useEffect(() => {
        const party_id = params.id
        dispatch({
            type:'SAGA/FETCH_REMINDERS_PAGE_TO_EDIT',
            payload: party_id
        })
        dispatch({
            type: 'STORE_PARTY_ID',
            payload: params.id
          })
    },[params.id])

    console.log(remindersToEdit)

    const editReceiveReminders = (event) => {
            dispatch({
                type:'EDIT_RECEIVE_REMINDERS', 
                payload: event.target.checked
             })
    }


    const handleUpdateToRemindersPage = (event) => {
        event.preventDefault();

        let partyId ={
            party_id:storePartyId[0]
        }

            dispatch({
                type:'SAGA/UPDATE_REMINDERS_PAGE',
                // payload: reminders
                payload: {
                    email:remindersToEdit.email_address,
                    phoneNumber:remindersToEdit.phone_number,
                    receiveReminders:remindersToEdit.receive_reminders,
                    party_id:storePartyId.party_id
                }
                
            })   
            history.push(`/success/${storePartyId.party_id}`)
    }
    console.log('in handleUpdateToRemindersPage dispatch', handleUpdateToRemindersPage)

  
        

    return (
        <>
     
            <TextField
                id="outlined-required"
                label="email"
                sx={{
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "#4330DA" },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset":{borderColor:"#4330DA"}
                    },
                    "& label.Mui-focused":{color:"#4330DA"},
                    margin:"5px"
                  }}
                value={remindersToEdit.email_address || ''}
                onChange={(event) => dispatch({type: 'EDIT_EMAIL', payload: event.target.value})}
            />  

            <TextField
                id="outlined-required"
                label="Phone Number"
                sx={{
                    "& .MuiOutlinedInput-root": {
                      "& > fieldset": { borderColor: "#4330DA" },
                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset":{borderColor:"#4330DA"}
                    },
                    "& label.Mui-focused":{color:"#4330DA"},
                    margin:"5px"
                  }}
                value={remindersToEdit.phone_number || ''}
                onChange={(event) => dispatch({type: 'EDIT_PHONE_NUMBER', payload: event.target.value})}
            /> 
         

            <FormGroup>
                <FormControlLabel 
                    control={<Switch 
                            className={classes.switch}
                            checked={remindersToEdit.receive_reminders || false}  
                            onChange={editReceiveReminders}/>}
                            label="I would like to receive event updates and reminders."
                />
            </FormGroup>


    {/* Back Button */}
            <Button 
                className="backToEventCodePage"
                type="back"
                variant="outlined" 
                style={{color:"#4330DA", 
                        border:"2px solid #4330DA", 
                        marginTop:"25px",
                        marginLeft:"20px"}}
                onClick={ history.push(`/editRsvp/${storePartyId.party_id}`)}>Back
            </Button>  


    {/* Submit Updates Button */}
            <Button 
                className="backToEventCodePage"
                type="back"
                variant="outlined" 
                style={{color:"#4330DA", 
                        border:"2px solid #4330DA", 
                        marginTop:"25px",
                        marginLeft:"20px"}}
                onClick={handleUpdateToRemindersPage}>Submit Updates
            </Button>
        </>
    )
}

export default EditRemindersPage;