import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';


//MUI Imports
import Button from '@mui/material/Button';



function SuccessPage() {
 
  const history = useHistory();
  const storedPartyId = useSelector(store => store.storeNavigation.storePartyId);



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
          onClick={() => history.push(`/editReminders/${storedPartyId[0]}`)}>Edit My RSVP
      </Button>

      {/* history.push(`/success/${storePartyId[0]}`) */}


    </div>
  );
}

export default SuccessPage;
