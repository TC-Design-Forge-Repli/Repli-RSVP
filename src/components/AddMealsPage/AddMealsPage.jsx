import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector } from 'react-redux';
import './AddMealsPage.css';


function AddMealsPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  let eventDetails = useSelector((store) => store.eventDetails)
  let guests = useSelector((store) => store.partyReducer)
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
    let eventObjectToSendToDb = {
      meals: inputFields,
      eventDetails: eventDetails,
      parties: guests.party
    }
    dispatch({
      type: 'SAGA/CREATE_EVENT', 
      payload: eventObjectToSendToDb
    })
    console.log(eventObjectToSendToDb)
  }

  const removeInputs = (index) => {
    let data = [...inputFields];
    data.splice(index, 1)
    setInputFields(data)
  }

  const goToAddGuests = () =>{
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
          fontFamily: "Montserrat",
          marginLeft: "35%",
          marginBottom: "20px"
        }}
      >
        Add Meal+
      </Button>

      <form onSubmit={submit}>
        {inputFields.map((input, index) => {
          return (
            <div key={index} className="inputsDiv">
              <TextField
                id="outlined-required"
                name="name"
                label={`Meal Option ${index + 1}`}
                placeholder={`Meal Option ${index + 1}`}
                value={input.name}
                onChange={(event) => handleFormChange(index, event)}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {borderColor: "#4330DA"}
                  },
                  "& label.Mui-focused": {color: "#4330DA"},
                  margin: "5px"
                }}
              />
              {/* Delete button will only render for every option after the first */}
              {index !== 0 && <IconButton onClick={() => removeInputs(index)}>
                <DeleteForeverIcon />
              </IconButton>}
              <TextField
                id="outlined-required"
                name="description"
                label={`Meal Description ${index + 1}`}
                placeholder={`Meal Description ${index + 1}`}
                value={input.description}
                onChange={(event) => handleFormChange(index, event)}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {borderColor: "#4330DA"}
                  },
                  "& label.Mui-focused": {color: "#4330DA"},
                  margin: "5px"
                }}
              />
            </div>
          )
        })}
      </form>

      <div className="backAndSubmitButtons">
        <Button 
          variant="outlined"
          onClick={goToAddGuests}
          sx={{
            color: "#4330DA",
            fontFamily: "Montserrat",
            margin: "10px",
            borderColor: "#4330DA"
          }}
        >
          Back
        </Button>
        <Button
          variant="contained" 
          onClick={submit}
          sx={{
            backgroundColor: "#4330DA",
            fontFamily: "Montserrat",
            margin: "10px"
          }}
        >
          Submit
        </Button>
      </div>
    </section>
  );
}


export default AddMealsPage;