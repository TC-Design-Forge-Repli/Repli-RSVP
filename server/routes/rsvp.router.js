const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.put('/response/:id', (req, res) => {
    const guest_id = req.params.id;
    const response = req.body.response;
    const meal_id = req.body.meal_id;
    const sqlQuery = `
        UPDATE "guests"
        SET "response" = $1, "meal_id" = $2
        WHERE "id" = $3;
    `;
    const sqlValues = [response, meal_id, guest_id];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        console.log('updated guest response to:', response);
        res.sendStatus(201);
    })
    .catch((dbErr) => {
        console.log('error updating guest response in /api/rsvp/response/:id PUT', dbErr);
        res.sendStatus(500);
    })
});

router.put('/meal/:id', (req, res) => {
    const guest_id = req.params.id;
    const response = req.body.response;
    const meal_id = req.body.meal_id;
    const sqlQuery = `
        UPDATE "guests"
        SET "response" = $1, "meal_id" = $2
        WHERE "id" = $3;
    `;
    const sqlValues = [response, meal_id, guest_id];
    pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        console.log('updated guest response to:', response, 'and meal to', meal_id);
        res.sendStatus(201);
    })
    .catch((dbErr) => {
        console.log('error updating guest meal in /api/rsvp/meal/:id PUT', dbErr);
        res.sendStatus(500);
    })
});


module.exports = router;