import React, { useState } from 'react';
import {useSelector} from 'react-redux';


// MUI Imports
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import styled from "styled-components";
import { Grid } from "@mui/material";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';



function EditRemindersPage() {

    const dispatch = useDispatch();
    // const useHistory = useHistory();

    const remindersPageToEdit = useSelector((store) => store.remindersPageToEdit)
    
    useEffect(() => {
        dispatch({
            type:'SAGA/FETCH_REMINDERS_PAGE_TO_EDIT',
        })
    },[])

    console.log(remindersPageToEdit)

    const handleUpdateToRemindersPage = (event) => {
        event.preventDefault();
            dispatch({
                type:'SAGA/UPDATE_REMINDERS_PAGE',
                payload: remindersPageToEdit
            })
            history.push('/success')
    }

    return (
        <>
         
            {/* <TextField
                // required
                id="outlined-required"
                label="email"
                // defaultValue="Phone Number"
                value={remindersPageToEdit.email || ""}
                onChange={(event) => dispatch({type: 'EDIT_EMAIL', payload: event.target.value})}
            />  

            <TextField
                // required
                id="outlined-required"
                label="Phone Number"
                // defaultValue="Phone Number"
                value={remindersPageToEdit.phoneNumber || ""}
                onChange={(event) => dispatch({type: 'EDIT_PHONE_NUMBER', payload: event.target.value})}
            />  

            <FormControlLabel 
                control={< Checkbox style={{color:"#4330DA"}}/>} 
                label="I would like to receive event updates and reminders."
                checked={remindersPageToEdit.receiveReminders}
                onChange={(event) => dispatch({type: 'EDIT_RECEIVE_REMINDERS', payload: event.target.checked})}
            /> */}

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
                // onClick={handleUpdateToRemindersPage}
                >Submit
            </Button>
        </>
    )
}

export default EditRemindersPage;