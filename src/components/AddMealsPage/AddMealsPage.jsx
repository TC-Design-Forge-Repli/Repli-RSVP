import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './AddMealsPage.css';


function AddMealsPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [inputFields, setInputFields] = useState([{ name: '', description: '' }]);

  const handleFormChange = (index, event) => {
    // store inputFields state into a variable called data with spread operator
    let data = [...inputFields];
    // target the index of the data variable using index parameter, and name of the property using event.target.name
    // inside the data index, we are storing the values from the input fields using event.target.value
    data[index][event.target.name] = event.target.value;
    // store this data back inside the inputFields array using the setInputFields method
    setInputFields(data);
  }

  const addInputs = () => {
    let newInput = { name: '', description: '' }
    // set newInput inside the inputFields state
    setInputFields([...inputFields, newInput])
  }

  const submit = (event) => {
    event.preventDefault();
    console.log(inputFields)

    dispatch({
      type: 'SET_MEALS',
      payload: inputFields
    })
  }

  const removeInputs = (index) => {
    let data = [...inputFields];
    data.splice(index, 1)
    setInputFields(data)
  }
  const backButton = () =>{
    history.push('/addGuests')
  }

  return (
    <section>
      <h2>Add Meals</h2>
      <p>How many meals?</p>

      <Button 
        variant="contained" 
        onClick={addInputs}
        style={{
          backgroundColor: "#4330DA",
          fontFamily: "Montserrat"
        }}
      >
        Add Meal+
      </Button>

      <form onSubmit={submit}>
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <TextField 
                required
                id="outlined-required"
                name="name"
                label={`Meal Option ${index + 1}`}
                placeholder={`Meal Option ${index + 1}`}
                value={input.name}
                onChange={(event) => handleFormChange(index, event)}
              />
              {/* Delete button will only render for every option after the first */}
              {index !== 0 && <button onClick={() => removeInputs(index)}><DeleteForeverIcon /></button>}
              <TextField
                required
                id="outlined-required"
                name="description"
                label={`Meal Description ${index + 1}`}
                placeholder={`Meal Description ${index + 1}`}
                value={input.description}
                onChange={(event) => handleFormChange(index, event)}
              />
            </div>
          )
        })}
      </form>

      <Button 
        variant="outlined"
        onClick={backButton}
        style={{
          color: "#4330DA",
          fontFamily: "Montserrat",
          outline: "1px solid #4330DA"
        }}
      >
        Back
      </Button>
      <Button 
        variant="contained" 
        onClick={submit}
        style={{
          backgroundColor: "#4330DA",
          fontFamily: "Montserrat"
        }}
      >
        Submit
      </Button>
    </section>
  );
}


export default AddMealsPage;