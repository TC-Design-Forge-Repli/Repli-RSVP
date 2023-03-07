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

router.post('/match', (req, res) => {
  console.log('what we are sending', req.body.eventCodeToMatch);
  let eventCodeToMatch = req.body.eventCodeToMatch;
  let sqlQuery = `
    SELECT "event_code" FROM "events";
  `;
  pool.query(sqlQuery)
  .then((dbRes) => {
    let doesEventCodeMatch = false;
      for (let db of dbRes.rows) {
        if (db.event_code == eventCodeToMatch) {
          doesEventCodeMatch = true;
          console.log('hello')
        }
      }
      console.log(doesEventCodeMatch)
      res.send(doesEventCodeMatch);
  })
  .catch((dbErr) =>{
    console.log('error in /api/checkEventCode GET', dbErr);
    res.sendStatus(500);
  })
})

module.exports = router;
