const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();




router.get('/', async (req, res) =>{
  const userId = req.user.id
  let sqlQuery = `
  SELECT
  events.id AS event_id,
  events.event_name,
  events.event_deadline,
  events.event_location,
  events.event_code,
  events.event_date
  FROM
  "user"
  JOIN events ON events.event_host_id = "user".id
  WHERE "user"."id" = $1;
  `
  let sqlValue = [userId];
  pool.query(sqlQuery, sqlValue)
    .then((dbRes) =>{
      console.log(dbRes.rows)
      res.send(dbRes.rows)
    })
    .catch((dbErr) =>{
      console.log(dbErr)
      res.sendStatus(500)
    })
})
router.get('/:id', (req, res) =>{
  const event_id = req.params.id
  console.log(event_id)
  let sqlQuery =`
  SELECT 
  events.id AS event_id,
  events.event_name,
  events.event_deadline,
  events.event_location,
  events.event_code,
  events.event_date
  FROM 
  "events"
  WHERE events.id = $1;
  `
  let sqlValue = [event_id]
  pool.query(sqlQuery, sqlValue)
    .then((dbRes) =>{
      console.log('$$$$$$$$$', dbRes.rows)
      res.send(dbRes.rows)
    })
    .catch((dbErr) =>{
      res.sendStatus(200)
      console.log(dbErr)
    })
})

// POST /api/events
router.post('/', async (req, res) => {
  const determinePartySize = (party) =>{
    let count = 1;
    let count2 = 2;
    let query = ``
    for(let i = 0; i < party.length; i++){
        if(i === party.length - 1){
            query = query + `($${count}, $${count2})`
        } else{
            query = query + `($${count}, $${count2}),`
            count = count + 2;
            count2 = count2 + 2;
        }
    }
    return query;
  }
  const determineAmountOfMeals = (mealsArray) =>{
    let count = 1;
    let count2 = 2;
    let count3 = 3;
    let query = ``
    for(let i = 0; i < mealsArray.length; i++){
        if(i === mealsArray.length - 1){
            query = query + `($${count}, $${count2}, $${count3})`
        } else{
            query = query + `($${count}, $${count2}, $${count3}),`
            count = count + 3;
            count2 = count2 + 3;
            count3 = count3 + 3;
        }
    }
    return query
  }
  const determineAmountOfGuests = (guestArray) =>{
    let count = 1; 
    let count2 = 2;
    let query = ``
    let newArray = [];
    for(let party of guestArray){
        newArray.push(...party.guestList)
    }
    for(let i = 0; i < newArray.length; i++){
        if(i === newArray.length-1){
            query = query + `($${count}, $${count2})`
        } else{
            query = query + `($${count}, $${count2}),`
            count = count + 2;
            count2 = count2 + 2;
        }
    }
    return query
  }
  const dynamicPartySqlValues = (party, eventId) =>{
    let arrayToHold = [];
    for(let part of party){
        arrayToHold.push(eventId)
        arrayToHold.push(part.name)
    }
    return arrayToHold;
  }
  const dynamicMealsSqlValues = (eventId, mealsArray) =>{
    let arrayToHold = [];
    for(let meals of mealsArray){
        arrayToHold.push(eventId)
        arrayToHold.push(meals.name)
        arrayToHold.push(meals.description)
    }
    return arrayToHold;
  }
  const dynamicGuestSqlsValues = (partyIdArray, guestArray) =>{
    let arrayToHold = [];
    for (let i = 0; i < partyIdArray.length; i++) {
      const partyId = partyIdArray[i].id;
      const guests = guestArray[i].guestList;
      for (let guest of guests) {
        arrayToHold.push(partyId);
        arrayToHold.push(guest);
      }
    }
    return arrayToHold;
  }
  const userId = req.user.id
  const eventDetails = req.body.eventDetails
  let sqlQuery1 = `
  INSERT INTO "events"
  ("event_host_id", "event_name", "event_deadline", "event_location", "event_code", "event_date")
  VALUES
  ($1, $2, $3, $4, $5, $6)
  RETURNING id; 
  `
  let sqlValues1 = [userId, eventDetails.eventTitle, eventDetails.rsvpCloseDate, eventDetails.location, eventDetails.eventCode, eventDetails.date]
  pool.query(sqlQuery1, sqlValues1)
    .then((dbRes1) =>{
        const eventIdThatWeJustCreated = dbRes1.rows[0].id
        const partyName = req.body.parties
        let sqlQuery2 = `
        INSERT INTO "party"
        ("event_id", "name")
        VALUES
        ${determinePartySize(partyName)}
        RETURNING id;
        `
        let sqlValues2 = dynamicPartySqlValues(partyName, eventIdThatWeJustCreated)
        pool.query(sqlQuery2, sqlValues2)
            .then((dbRes2) =>{
                const partyIdArrayOfJustCreatedParties = dbRes2.rows
                const meals = req.body.meals
                let sqlQuery3 = `
                INSERT INTO "meal_options"
                ("event_id", "meal_name", "description")
                VALUES
                ${determineAmountOfMeals(meals)}
                RETURNING id; 
                `
                let sqlValues3 = dynamicMealsSqlValues(eventIdThatWeJustCreated, meals)
                pool.query(sqlQuery3, sqlValues3)
                    .then((dbRes3) =>{
                        const guestArray = req.body.parties
                        let sqlQuery4 = `
                        INSERT INTO "guests"
                        ("party_id", "name")
                        VALUES
                        ${determineAmountOfGuests(guestArray)};
                        `
                        let sqlValues4 = dynamicGuestSqlsValues(partyIdArrayOfJustCreatedParties, guestArray);
                        pool.query(sqlQuery4, sqlValues4)
                            .then((dbRes5) =>{
                                res.sendStatus(200)
                            })
                            .catch((dbErr) =>{
                                res.sendStatus(500)
                            })
                    })
                    .catch((dbErr3) =>{
                        console.log(dbErr3)
                    })
            })
            .catch((dbErr2) =>{
                console.log(dbErr2)
            })
    })
    .catch((dbErr1) =>{
        console.log(dbErr1)
    })
});

router.put('/', (req, res) => {
    console.log('req.body:', req.body);
    console.log('req.body.newEventCode:', req.body.newEventCode)

    const sqlQuery = `
        UPDATE "events"
        SET "event_code" = $1;
    `;

    const sqlValues = [req.body.newEventCode];

    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.error('Error PUT /api/events:', dbErr);
            res.sendStatus(500);
        })
})

module.exports = router;