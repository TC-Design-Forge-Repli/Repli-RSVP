import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

//MUI imports
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function addGuestsPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [newPartyInput, setNewPartyInput] = useState([]);
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    { label: '' },
    { label: '' },
    { label: '' },
  ];

  // This function takes an argument called partyIndex, which is used to determine which party's guest list should be updated.
  // The function uses the setNewPartyInput function (which was created by the useState hook earlier) to update the newPartyInput state value.
  // The setNewPartyInput function takes a function as its argument (sometimes called a "functional update"), which is called with the previous state value
  // (prevInputs) as its argument. Inside the function, a new array is created (newInputs) that is a copy of the previous state array using the spread operator ([...prevInputs]).

  // Next, a new guest is added to the guest list for the party specified by partyIndex.
  // This is done by accessing the guestList property of the party object at index partyIndex,
  // and calling the push method on it to add a new empty string. Finally, the newInputs array is returned,
  // which will become the new state value for newPartyInput.

  const addNewGuestInput = (partyIndex) => {
    setNewPartyInput((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[partyIndex].guestList.push("");
      return newInputs;
    });
  };

  const addNewPartyInput = () => {
    setNewPartyInput((prevInputs) => [
      ...prevInputs,
      {
        name: "",
        guestList: [],
      },
    ]);
  };

  const handleGuestInputChange = (event, partyIndex, guestIndex) => {
    const newInputs = [...newPartyInput];
    newInputs[partyIndex].guestList[guestIndex] = event.target.value;
    setNewPartyInput(newInputs);
  };

  const handlePartyInputChange = (event, partyIndex) => {
    const newInputs = [...newPartyInput];
    newInputs[partyIndex].name = event.target.value;
    setNewPartyInput(newInputs);
  };

  // Then, a new newParty object is created, which contains two properties - party, which is the entire
  // newPartyInput state array, and guests, which is an array that is created by using flatMap and filter
  // array methods on the newPartyInput array.

  // flatMap is used to flatten the guestList arrays of all parties into one single array of guests,
  // and filter is used to remove any empty or whitespace-only strings from the guests array.

  const addNewParty = (event) => {
    event.preventDefault();
    console.log("This is the state, newPartyInput:", newPartyInput);

    let newParty = {
      party: newPartyInput,
      guests: newPartyInput
        .flatMap((party) => party.guestList)
        .filter((guest) => guest.trim() !== ""),
    };
    console.log("This is the state, newParty:", newParty);

    dispatch({
      type: "ADD_PARTY_INPUT",
      payload: newParty,
    });

    history.push("/addMeals");
  };

  const deleteParty = (partyIndex) => {
    let thisParty = [...newPartyInput];
    thisParty.splice(partyIndex, 1);
    setNewPartyInput(thisParty);
    console.log("This is the delete party function", partyIndex);
    console.log("This is the this party variable", thisParty);
  };

  const deleteGuests = (partyIndex, guestIndex) => {
    let thisParty = [...newPartyInput];
    thisParty[partyIndex].guestList.splice(guestIndex, 1);
    setNewPartyInput(thisParty);
    console.log("This is the delete guest function", partyIndex);
    console.log("This is the this guest variable", thisParty);
  };
  const backButton = () =>{
    history.push('/createEvent')
  }
  // required
  // id="outlined-required"
  // label="Required"
  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <h2>Add Guests</h2>
      <br />
      <h4>How many guests?</h4>
      <form className="partyForm" onSubmit={addNewParty}>
        {newPartyInput.map((partyInput, partyIndex) => (
          <div key={partyIndex}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                required
                className="partyInput"
                id="outlined-required"
                value={partyInput.name}
                label={`Party ${partyIndex + 1}`}
                sx={{
                  color: "#4330DA",
                  display: "block",
                  marginBottom: "20px",
                  flexGrow: 1,
                }}
                onChange={(evt) => handlePartyInputChange(evt, partyIndex)}
              />
              <IconButton color="error" onClick={() => deleteParty(partyIndex)}>
                <DeleteForeverIcon />
              </IconButton>
            </div>

            {partyInput.guestList.map((guestInput, guestIndex) => (
              <div
                key={guestIndex}
                style={{ display: "flex", alignItems: "center" }}
              >
                <TextField
                  required
                  className="guestsInput"
                  id="outlined-required"
                  value={guestInput}
                  label={`Guest ${guestIndex + 1}`}
                  sx={{ color: "#4330DA", flexGrow: 1 }}
                  onChange={(evt) =>
                    handleGuestInputChange(evt, partyIndex, guestIndex)
                  }
                />
                <IconButton
                  color="error"
                  onClick={() => deleteGuests(partyIndex, guestIndex)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </div>
            ))}
            <Button
              className="addGuestButton"
              type="button"
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ color: "#4330DA", display: "block", marginBottom: "15px" }}
              onClick={() => addNewGuestInput(partyIndex)}
            >
              Add Guest +
            </Button>
          </div>
        ))}
        <br />
        <Button
          className="addPartyButton"
          type="button"
          variant="outlined"
          color="secondary"
          size="small"
          sx={{ color: "#4330DA", display: "block", marginBottom: "15px" }}
          onClick={addNewPartyInput}
        >
          Add Party +
        </Button>

        <br />
        <br />
      </form>

      <Button
        className="backButton"
        variant="outlined"
        style={{
          textTransform: "none",
          color: "#4330DA",
          fontFamily: "Montserrat",
          border: "1.5px solid #4330DA",
          marginTop: "35px",
          marginLeft: "10px",
        }}
        onClick={backButton}
      >
        Back
      </Button>
      <Button
        className="backButton"
        variant="contained"
        style={{
          textTransform: "none",
          backgroundColor: "#4330DA",
          fontFamily: "Montserrat",
          color: "white",
          marginTop: "35px",
          marginLeft: "20px",
        }}
        onClick={addNewParty}
      >
        Next
      </Button>
    </>
  );
}

export default addGuestsPage;