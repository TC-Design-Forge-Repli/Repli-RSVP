const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

//POST route for Guest's: email, phone and receive reminders choice
router.put('/:id', (req, res) => {
    const reminders = req.body;
    console.log(reminders)
    console.log(req.params, "in put route")

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

module.exports = router;