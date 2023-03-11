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
import { Switch } from '@material-ui/core';




function EditRemindersPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    
    const storePartyId = useSelector(store => store.storeNavigation.storePartyId);
    const remindersToEdit = useSelector(store => store.remindersToEdit)
    
    const [checked, setChecked] = useState(remindersToEdit.receive_reminders)
    // const [checked, setChecked] = useState(true)

    const handleSwitchToggle = () => {
        setChecked(!checked);
    }



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

    const editReceiveReminders = (event) => {
        event.preventDefault();
            dispatch({
                type:'SAGA/EDIT_RECEIVE_REMINDERS', 
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
                payload: remindersToEdit,
            })   
            dispatch({
                type: 'STORE_PARTY_ID',
                payload: storePartyId
            })
            history.push(`/success/${storePartyId[0]}`)
    }
    console.log('in handleUpdateToRemindersPage dispatch', handleUpdateToRemindersPage)

  
        

    return (
        <>
     
            <TextField
                // required
                id="outlined-required"
                label="email"
                // defaultValue="Phone Number"
                value={remindersToEdit.email_address || ''}
                onChange={(event) => dispatch({type: 'EDIT_EMAIL', payload: event.target.value})}
            />  

            <TextField
                // required
                id="outlined-required"
                label="Phone Number"
                // defaultValue="Phone Number"
                value={remindersToEdit.phone_number || ''}
                onChange={(event) => dispatch({type: 'EDIT_PHONE_NUMBER', payload: event.target.value})}
            /> 

 {/* <form onChange={editReceiveReminders}>
<FormControlLabel 
              control={<Switch checked={remindersToEdit.receive_reminders}  
              onChange={(event) => setChecked(event.target.checked)}/>}
              label="I would like to receive event updates and reminders."
                />
                </form> */}




{/* The following code "works" BUT I get this warning: 
react.development.js:220 Warning: Failed prop type: 
Invalid prop `checked` of type `object` 
supplied to `ForwardRef(Switch)`, expected `boolean`
 */}
            {/* <FormControlLabel
                control={
                 <Switch
                    checked={remindersToEdit}
                    onChange={(event) => remindersToEdit(event.target.checked)}
                />}
                    label="I would like to get receive updates and reminders"
            /> 


        </form>   */}


{/* The following code gets an error: react-dom.development.js:67 Warning: 
A component is changing an uncontrolled input to be controlled. 
This is likely caused by the value changing from undefined to a defined value, 
which should not happen. Decide between using a controlled or 
uncontrolled input element for the lifetime of the component
https://reactjs.org/link/controlled-components */}
                {/* <FormControlLabel control={<Switch 
                value={remindersToEdit.receive_reminders}
                checked={remindersToEdit.receive_reminders} 
                onChange={handleSwitchToggle} />}
                label="I want to get reminders"
                /> */}
         



               {checked ? 
            <>
            <form onChange={editReceiveReminders}>
            <FormGroup>
                <FormControlLabel 
              control={<Switch checked={checked}  
              onChange={(event) => setChecked(event.target.checked)}/>}
              label="I would like to receive event updates and reminders."
                />
            </FormGroup>
            </form>
            </>
            :
            <>
            <form onChange={editReceiveReminders}>
            <FormGroup>

                <FormControlLabel 
              control={<Switch checked={checked}  
              onChange={(event) => setChecked(event.target.checked)}/>}
              label="I would like to receive event updates and reminders."
                />
            </FormGroup>
            </form>
            
            </>

            }   






    {/* Back Button */}
            <Button 
                className="backToEventCodePage"
                type="back"
                variant="outlined" 
                style={{color:"#4330DA", 
                        border:"2px solid #4330DA", 
                        marginTop:"25px",
                        marginLeft:"20px"}}
                onClick={ history.push(`/rsvp/${storePartyId[0]}`)}>Back
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
                onClick={handleUpdateToRemindersPage}
                >Submit Updates
            </Button>
        </>
    )
}

export default EditRemindersPage;