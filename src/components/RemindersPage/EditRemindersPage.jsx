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
import Checkbox from '@mui/material/Checkbox';
import styled from "styled-components";
import { Grid } from "@mui/material";




function EditRemindersPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    
    const storePartyId = useSelector(store => store.storeNavigation.storePartyId);
    const remindersToEdit = useSelector((store) => store.remindersToEdit)
    

    useEffect(() => {
        const party_id = params.id
        dispatch({
            type:'SAGA/FETCH_REMINDERS_PAGE_TO_EDIT',
            payload: party_id
        })
        dispatch({
            type: 'STORE_PARTY_ID',
            payload: storePartyId
          })
    },[params.id])

    console.log(remindersToEdit)

    const handleUpdateToRemindersPage = (event) => {
        event.preventDefault();
            dispatch({
                type:'SAGA/UPDATE_REMINDERS_PAGE',
                payload: remindersToEdit
            })
            
            history.push('/success')
    }

    return (
        <>
         
            <TextField
                // required
                id="outlined-required"
                label="email"
                // defaultValue="Phone Number"
                value={remindersToEdit.email_address || ""}
                onChange={(event) => dispatch({type: 'EDIT_EMAIL', payload: event.target.value})}
            />  

            <TextField
                // required
                id="outlined-required"
                label="Phone Number"
                // defaultValue="Phone Number"
                value={remindersToEdit.phone_number || ""}
                onChange={(event) => dispatch({type: 'EDIT_PHONE_NUMBER', payload: event.target.value})}
            />  

            <FormControlLabel 
                control={< Checkbox style={{color:"#4330DA"}}/>} 
                label="I would like to receive event updates and reminders."
                checked={remindersToEdit.receive_reminders}
                onChange={(event) => dispatch({type: 'EDIT_RECEIVE_REMINDERS', payload: event.target.checked})}
            /> 
{/* 
{/* NEED AMAN'S PAGE NAME FOR ONCLICK */}
            {/* Back Button */}
            {/* <Button 
                className="backToEventCodePage"
                type="back"
                variant="outlined" 
                style={{color:"#4330DA", 
                        border:"2px solid #4330DA", 
                        marginTop:"25px",
                        marginLeft:"20px"}}
                onClick={}>Back
            </Button> */}

            <Button 
                className="backToEventCodePage"
                type="back"
                variant="outlined" 
                style={{color:"#4330DA", 
                        border:"2px solid #4330DA", 
                        marginTop:"25px",
                        marginLeft:"20px"}}
                onClick={handleUpdateToRemindersPage}
                >Submit Updates
            </Button>
        </>
    )
}

export default EditRemindersPage;