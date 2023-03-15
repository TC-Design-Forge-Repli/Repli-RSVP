const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// POST /api/meals
router.post('/', rejectUnauthenticated, (req, res) => {
  const newMeals = req.body;
  console.log('newMeals:', newMeals);

  // Construct the SQL query dynamically based on the number of input fields
  let sqlQuery = 'INSERT INTO meal_options (meal_name, description) VALUES ';
  let sqlValues = [];

  // loop over newMeals array and concatenate the appropriate number of
  // placeholders for the meal names and descriptions.
  for (let i = 0; i < newMeals.length; i++) {
    if (i !== 0) {
      sqlQuery += ', ';
    }
    // building an array of SQL values by pushing the name and
    // description values for each meal onto the sqlValues array.
    sqlQuery += `($${i * 2 + 1}, $${i * 2 + 2})`;
    sqlValues.push(newMeals[i].name);
    sqlValues.push(newMeals[i].description);
  }

  console.log('sqlQuery:', sqlQuery);
  console.log('sqlValues:', sqlValues);

  pool.query(sqlQuery, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.error('Error meals POST:', dbErr);
      res.sendStatus(500);
    })
});

// GET
router.get('/:id', (req, res) => {
  const event_id = req.params.id
  const sqlQuery = `
    SELECT * FROM "meal_options"
    WHERE event_id = $1;
  `;
  const sqlValue = [event_id]
  pool.query(sqlQuery, sqlValue)
    .then((dbRes) => {
      const meals = dbRes.rows;
      res.send(meals);
    })
    .catch((dbErr) => {
      console.error('Error /api/meals GET:', dbErr);
      res.sendStatus(500);
    })
})
router.delete('/:id', (req, res) =>{
  const mealId = req.params.id
    const sqlQuery = `
    DELETE FROM "meal_options"
    WHERE "id" = $1;
    `
    const sqlValue = [mealId]
    pool.query(sqlQuery, sqlValue)
        .then((dbRes) =>{
            res.sendStatus(200)
        })
        .catch((dbErr) =>{
            console.log('Problem deleting one meal in server', dbErr)
            res.sendStatus(500)
        })
})


module.exports = router;