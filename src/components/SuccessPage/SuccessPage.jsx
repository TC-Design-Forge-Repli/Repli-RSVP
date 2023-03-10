import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';


//MUI Imports
import Button from '@mui/material/Button';



function SuccessPage() {
 
  const storePartyId = useSelector(store => store.storeNavigation.storePartyId);

  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const party_id=params.id
    dispatch({
      type: 'STORE_PARTY_ID',
      payload: {party_id: params.id}
    })
 
    console.log(params.id)
  }, [params.id])



  return (
    <div>
       <h4>Perfect!!<br></br> You are all set.<br></br> We can't wait to see you on our BIG day!!</h4>

      {/* Edit Button */}
      <Button 
          className="backToEventCodePage"
          type="back"
          variant="outlined" 
          style={{color:"#4330DA", 
          border:"2px solid #4330DA", 
          marginTop:"25px",
          marginLeft:"20px"}}
          onClick={() => history.push(`/rsvp/${storePartyId[0]}`)}>Edit My RSVP
      </Button>




    </div>
  );
}

export default SuccessPage;
