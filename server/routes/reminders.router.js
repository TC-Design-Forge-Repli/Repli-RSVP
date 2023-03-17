const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route to EDIT Guest's: email, phone and receive reminders choice
 */
router.get('/:id', (req, res) => {
    const remindersToEdit = req.params.id
console.log(req.params.id)
console.log('req.body', req.body)
console.log('in reminders.router GET for: email/phone/reminders', req.params.id)


    const sqlQuery = 
    `
    SELECT 
        guests.phone_number,
        guests.email_address,
        guests.receive_reminders
    FROM guests
        WHERE party_id = $1;
    `;
    const sqlValues = [remindersToEdit];
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.send(dbRes.rows[0])
            console.log(dbRes.rows[0])
        })
        .catch((dbError) => {
            console.log('Error in GET route for remindersToEdit', dbError)
            res.sendStatus(500);
        })
});






//PUT route for Guest's: email, phone and receive reminders choice
router.put('/:id', (req, res) => {
    // const reminders=req.params.id
    const reminders = req.body;
    console.log(reminders)
    console.log(req.params, "in reminders.router PUT for: email/phone/reminders", req.params.id)
  

    const sqlQuery = 
    `
    UPDATE "guests"
    SET 
    "email_address" =$1, 
    "phone_number" = $2, 
    "receive_reminders" = $3
    WHERE "party_id" = $4
    `;

    const sqlValues = [
        reminders.email, 
        reminders.phoneNumber,
        reminders.receiveReminders,
        reminders.party_id
    ]
    pool.query(sqlQuery, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((error) => {
            console.log('reminders POST failed', error);
            res.sendStatus(500);
        })
});








//POST route for Guest's: email, phone and receive reminders choice
router.put('/edit/:id', (req, res) => {
    // const reminders=req.params.id
    const remindersToEdit = req.body;
    console.log('in edit/id put route', remindersToEdit)
    console.log(req.params, "in reminders.router PUT for: email/phone/reminders", req.params.id)
  

    const sqlQuery = 
    `
    UPDATE "guests"
    SET 
    "email_address" =$1, 
    "phone_number" = $2, 
    "receive_reminders" = $3
    WHERE "party_id" = $4
    `;

    const sqlValues = [
        remindersToEdit.email, 
        remindersToEdit.phoneNumber,
        remindersToEdit.receiveReminders,
        remindersToEdit.party_id  
    ]
    pool.query(sqlQuery, sqlValues)
        .then((dbRes) => {res.sendStatus(201)
        console.log(dbRes.rows)
})
        
        .catch((error) => {
            console.log('reminders POST failed', error);
            res.sendStatus(500);
        })
});



// //POST route for Guest's: email, phone and receive reminders choice
// router.put('remindersToEdit/:id', (req, res) => {
//     // const reminders=req.params.id
//     const reminders = req.body;
//     console.log(reminders)
//     console.log(req.params, "in reminders.router PUT for: email/phone/reminders", req.params.id)
  

//     const sqlQuery = 
//     `
//     UPDATE "guests"
//     SET 
//     "email_address" =$1, 
//     "phone_number" = $2, 
//     "receive_reminders" = $3
//     WHERE "party_id" = $4
//     `;

//     const sqlValues = [
//         reminders.email, 
//         reminders.phoneNumber,
//         reminders.receiveReminders,
//         reminders.party_id
//     ]
//     pool.query(sqlQuery, sqlValues)
//         .then(() => res.sendStatus(201))
//         .catch((error) => {
//             console.log('reminders POST failed', error);
//             res.sendStatus(500);
//         })
// });


module.exports = router;