const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    const reminders = req.body;
    console.log(reminders)

    const sqlQuery = 
    `
    INSERT INTO "guests"
    ("email_address", "phone_number", "receive_reminders")
    VALUES
    ($1, $2, $3)
    `;

    const sqlValues = [
        reminders.email, 
        reminders.phoneNumber,
        reminders.receiveReminders
    ]
    pool.query(sqlQuery, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((error) => {
            console.log('reminders POST failed', error);
            res.sendStatus(500);
        })
});

module.exports = router;