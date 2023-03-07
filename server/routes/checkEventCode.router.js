const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {
    console.log(req.body.eventCodeToCheck)
    let eventCodeToCheck = req.body.eventCodeToCheck
  let sqlQuery = `
  SELECT "event_code" FROM "events";
  `
  pool.query(sqlQuery)
  .then((dbRes) =>{
    console.log(dbRes.rows)
    let isEventCodeUnique = true;
    for(let db of dbRes.rows){
        if(db.event_code === eventCodeToCheck){
            isEventCodeUnique = false;
        }
    }
    res.send(isEventCodeUnique)
  })
  .catch((dbErr) =>{
    console.log('CHECK EVENT CODE SERVER SIDE ERROR', dbErr)
    res.sendStatus(500)
  })
});

module.exports = router;
