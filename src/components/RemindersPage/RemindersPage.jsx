import React, { useState } from 'react';
import {useSelector} from 'react-redux';


// MUI Imports
import Button from '@mui/material/Button';
import styled from "styled-components";
import { Grid } from "@mui/material";


// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name RemindersPage with the name for the new component.
function RemindersPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  // const [heading, setHeading] = useState('Functional Component');


  return (
    <div>
      <h4>Please provide me with the best way to communicate with you:</h4>


     {/* Back Button */}
     <Button 
     className="backToEventCodePage"
     type="back"
     variant="outlined" 
     onClick={() => history.push('/eventCode')}>Back
   </Button>
   </div>
  );
}

export default RemindersPage;
