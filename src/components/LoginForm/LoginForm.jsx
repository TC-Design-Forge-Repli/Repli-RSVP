import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
//mui imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
      history.push('/dashboard')
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
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
          value="Log In"
          style={{
            textTransform: 'none',
            backgroundColor: '#4330DA',
            fontFamily: 'Montserrat',
            color: 'white',
            marginTop: '35px',
            marginLeft: '20px',
          }}
        >
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
