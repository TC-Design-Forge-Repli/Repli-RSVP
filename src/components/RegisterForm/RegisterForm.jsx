import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//mui imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
      <TextField
          label="username"
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "#4330DA" },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset":{borderColor:"#4330DA"}
            },
            "& label.Mui-focused":{color:"#4330DA"},
            margin:"5px",
            marginTop:"10px",
                    marginLeft:"20px",
                    marginRight:"20px"
          }}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
      <TextField
          label="password"
          type="password"
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "& > fieldset": { borderColor: "#4330DA" },
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset":{borderColor:"#4330DA"}
            },
            "& label.Mui-focused":{color:"#4330DA"},
            margin:"5px",
            marginTop:"10px",
                    marginLeft:"20px",
                    marginRight:"20px"
          }}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
      <Button
          className="loginButton"
          variant="contained"
          type="submit"
          value="Register"
          style={{
            textTransform: 'none',
            backgroundColor: '#4330DA',
            fontFamily: 'Montserrat',
            color: 'white',
            marginTop: '35px',
            marginLeft: '20px',
          }}
        >
          Register
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
