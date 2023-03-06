import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name AddMealsPage with the name for the new component.
function AddMealsPage() {
  const [textFields, setTextFields] = useState([textFields]);

  const addInput = () => {
    console.log('add input:');

    setTextFields(textFields.concat(''))
  }

  return (
    <div>
      <h2>Add Meals</h2>
      <p>How many meals?</p>
      <Button 
        variant="contained"
        onClick={addInput}
      >Add Meal+
      </Button>
      {/* <TextField 
        required
        id="outlined-required"
        label="Required"
        defaultValue="Meal 1"
      /> */}
      {textFields.map((field, index) => (
        <div>
          <TextField 
            required 
            id="outlined-required" 
            key={index} 
            label={`Meal Option ${index + 1}`}
            placeholder={`Meal Option ${index + 1}`}
          />
          <TextField 
            required 
            id="outlined-required" 
            key={index} 
            label={`Meal Description ${index + 1}`}
            placeholder={`Meal Description ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
}

export default AddMealsPage;
