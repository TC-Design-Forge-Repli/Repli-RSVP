const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// router.get('/',(req, res) =>{


//   // GET route code here
//   const userId = req.user.id

//   const sqlQuery = 
//   `
  // SELECT
  // events.id AS event_id,
  // events.event_name,
  // events.event_deadline,
  // events.event_location,
  // events.event_code,
  // events.event_date,
//   party.id AS party_id,
//   party.name AS party_name,
//   guests.id AS guest_id,
//   guests.name AS guest_name,
//   guests.response AS guest_response,
//   guests.phone_number AS guest_phone_number,
//   guests.email_address AS guest_email_address,
//   guests.meal_id AS guest_meal_id,
//   meal_options.id AS meal_id,
//   meal_options.meal_name AS meal_name,
//   meal_options.description AS meal_description
//  FROM
  // "user"
  // JOIN events ON events.event_host_id = "user".id
//   JOIN party ON events.id = party.event_id
//   JOIN guests ON party.id = guests.party_id
//   JOIN meal_options ON events.id = meal_options.event_id
//   WHERE "user"."id" = $1;

//   `
//   const sqlValues = [userId]
//   pool.query(sqlQuery, sqlValues)
//   .then((dbRes) => {
    // const events = [];

    //   // group rows by event id
    //   const rows = dbRes.rows;
    //   const groupedRows = {};
    //   rows.forEach((row) => {
    //     const { event_id, event_name, event_deadline, event_location, event_code, event_date, party_id, party_name, guest_id, guest_name, guest_responses, guest_phone_number, guest_email_address, guest_meal_id, meal_id, meal_name, meal_description } = row;
    //     if (!groupedRows[event_id]) {
    //       groupedRows[event_id] = {
    //         event_id,
    //         event_name,
    //         event_deadline,
    //         event_location,
    //         event_code,
    //         event_date,
    //         parties: [],
    //         meals: []
    //       };
    //     }
    //     const partyIndex = groupedRows[event_id].parties.findIndex((p) => p.party_id === party_id);
    //     console.log('$$$$$$$', partyIndex)
    //     if (partyIndex === -1) {
    //       groupedRows[event_id].parties.push({
    //         party_id,
    //         party_name,
    //         guests: []
    //       });
    //       console.log('#######', groupedRows)
    //       const guestIndex = groupedRows[event_id].parties[groupedRows[event_id].parties.length - 1].guests.findIndex((g) => g.guest_id === guest_id)
    //       console.log('@@@@@@@', guestIndex)
    //       console.log('%%%%%%%', event_id)
    //       console.log('!!!!!', party_id)
    //       if(guestIndex === -1){
    //         groupedRows[event_id].parties[party_id].guests.push({
    //           guest_id,
    //           guest_name,
    //           guest_responses,
    //           guest_phone_number,
    //           guest_email_address,
    //           guest_meal_id
    //         })
    //     }
    //   }
    //     console.log('$$$$$$$$',groupedRows[event_id].parties)
    //     const mealIndex = groupedRows[event_id].meals.findIndex((m) => m.meal_id === meal_id)
    //     if(mealIndex === -1){
    //         groupedRows[event_id].meals.push({
    //             meal_id,
    //             meal_name,
    //             meal_description
    //           });
    //     }
    //     // const guestIndex = groupedRows[event_id].parties[partyIndex].guests.findIndex((g) => g.guest_id === guest_id)
    //     // if(guestIndex === -1){
    //     //   groupedRows[event_id].parties[partyIndex].guests.push({
    //     //     guest_id,
    //     //     guest_name,
    //     //     guest_responses,
    //     //     guest_phone_number,
    //     //     guest_email_address,
    //     //     guest_meal_id
    //     //   })
    //     // }
    //     // groupedRows[event_id].parties[groupedRows[event_id].parties.length - 1].guests.push({
    //     //   guest_id,
    //     //   guest_name,
    //     //   guest_responses,
    //     //   guest_phone_number,
    //     //   guest_email_address,
    //     //   guest_meal_id
    //     // });
    //   });

    //   // push each event object into the events array
    //   Object.values(groupedRows).forEach((event) => {
    //     events.push(event);
//       });
//       console.log(events)
//       res.send(events);
//     })
//     .catch((dbErr) => {
//       console.error('Error /api/events GET:', dbErr);
//       res.sendStatus(500);
//     });
// });
// [
//     {
//         event_id: 
//         event_name: 
//         deadline: 
//         location:
//         event_code:
//         event_date: 
//         parties: [{
//             party_id: 
//             party_name: 
//             guests: [{
//                 guest_id: 
//                 guest_name: 
//                 guest_responses: 
//                 guest_phone_number:
//                 guest_email_address: 
//             }]
//         }],
//         meals: [{
//             meal_id:
//             meal_name: 
//             meal_description:
//         }]
//     }
// ]

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

router.delete('/:id', (req, res) =>{
  const eventId = req.params.id
    const sqlQuery = `
    DELETE FROM "events"
    WHERE "id" = $1;
    `
    const sqlValue = [eventId]
    pool.query(sqlQuery, sqlValue)
        .then((dbRes) =>{
            res.sendStatus(200)
        })
        .catch((dbErr) =>{
            console.log('Problem deleting one event in server', dbErr)
            res.sendStatus(500)
        })
});

module.exports = router;