import React, { useEffect, } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const donePosting = useSelector(store => store.donePosting)

  // this component doesn't do much to start, just renders some user reducer info to the DOM

  useEffect(() => {
    dispatch({
      type: 'SAGA/FETCH_ALL_DATA'
    })
  }, [donePosting])

  return (
    <div className="container">
    
    </div>
  );
}

// this allows us to use <App /> in index.js
export default Dashboard;
