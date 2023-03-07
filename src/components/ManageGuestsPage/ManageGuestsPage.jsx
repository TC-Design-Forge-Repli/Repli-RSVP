import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ManageGuestsPage() {
  const dispatch = useDispatch();

  const [newPartyInput, setNewPartyInput] = useState([]);

// This function takes an argument called partyIndex, which is used to determine which party's guest list should be updated.
// The function uses the setNewPartyInput function (which was created by the useState hook earlier) to update the newPartyInput state value.
// The setNewPartyInput function takes a function as its argument (sometimes called a "functional update"), which is called with the previous state value 
// (prevInputs) as its argument. Inside the function, a new array is created (newInputs) that is a copy of the previous state array using the spread operator ([...prevInputs]).

// Next, a new guest is added to the guest list for the party specified by partyIndex. 
// This is done by accessing the guestList property of the party object at index partyIndex, 
// and calling the push method on it to add a new empty string. Finally, the newInputs array is returned, 
// which will become the new state value for newPartyInput.

  const addNewGuestInput = (partyIndex) => {
    setNewPartyInput(prevInputs => {
      const newInputs = [...prevInputs];
      newInputs[partyIndex].guestList.push("");
      return newInputs;
    });
  };

  const addNewPartyInput = () => {
    setNewPartyInput(prevInputs => [...prevInputs,
       {  
        name: '', 
        guestList: []
       }
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
    console.log('This is the state', newPartyInput)
 

    let newParty = {

      party: newPartyInput,
      guests: newPartyInput
        .flatMap((party) => party.guestList)
        .filter((guest) => guest.trim() !== ""),
    };
    console.log('This is the state', newParty)


    dispatch({
      type: "ADD_PARTY_INPUT",
      payload: newParty,
    });

    // clearEventForm();
  };

  const deleteParty = (partyIndex) => {
      let thisParty = [...newPartyInput];
      thisParty.splice(partyIndex, 1)
      setNewPartyInput(thisParty)
      console.log('This is the delete party function', partyIndex)
      console.log('This is the this party variable', thisParty)

  }

  const deleteGuests = (partyIndex, guestIndex) => {
    let thisParty = [...newPartyInput];
    thisParty[partyIndex].guestList.splice(guestIndex, 1)
    setNewPartyInput(thisParty)
    console.log('This is the delete guest function', partyIndex)
    console.log('This is the this guest variable', thisParty)

}


  return (
    <>
      <h2>Add Guests</h2>
      <br />
      <h4>How many guests?</h4>
      <form className="partyForm" onSubmit={addNewParty}>
        {newPartyInput.map((partyInput, partyIndex) => (
          <div key={partyIndex}>
            <TextField
              className="partyInput"
              value={partyInput.name}
              label={`Party ${partyIndex + 1}`}
              variant="standard"
              sx={{ color: '#4330DA', display: "block", marginBottom: "20px" }}
              onChange={(evt) => handlePartyInputChange(evt, partyIndex)}
            />
            <Button onClick={() => deleteParty(partyIndex)}> Delete </Button>
            {partyInput.guestList.map((guestInput, guestIndex) => (
              <> 
              <TextField
                key={guestIndex}
                className="guestsInput"
                value={guestInput}
                label={`Guest ${guestIndex + 1}`}
                variant="standard"
                sx={{ color: '#4330DA' }}
                onChange={(evt) => handleGuestInputChange(evt, partyIndex, guestIndex)}
              />
               <Button onClick={() => deleteGuests(partyIndex, guestIndex)}> Delete </Button>
            </>
            ))}
            <Button
              className="addGuestButton"
              type="button"
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ color: '#4330DA', display: "block", marginBottom: "15px" }}
              onClick={() => addNewGuestInput(partyIndex)}
            >
              Add Guest +
            </Button>
          </div>
        ))}
        <br />
        <Button
          className="addGuestButton"
          type="button"
          variant="outlined"
          color="secondary"
          size="small"
          sx={{ color: '#4330DA', display: "block", marginBottom: "15px" }}
          onClick={addNewPartyInput}
        >
           Add Party + 
        </Button>
        
        <br />
        <br />
        <Button
          className="backButton"
          type="submit"
          variant="outlined"
          color="secondary"
          size="large"
          sx={{ color: '#4330DA', margin: '15px', marginRight: '50px' }}
        >
          Back
        </Button>
        <Button
          className="backButton"
          type="submit"
          variant="outlined"
          color="primary"
          size="large"
          sx={{ backgroundColor: '#4330DA', margin: '15px' }}
        >
          Next
        </Button>
      </form>
    </>
  );
};


export default ManageGuestsPage;
