import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';


//MUI Imports
import Button from '@mui/material/Button';
import { useEffect } from 'react';



function SuccessPage() {
 



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
          onClick={() => history.push('/rsvp')}>Edit My RSVP
      </Button>




    </div>
  );
}

export default SuccessPage;
