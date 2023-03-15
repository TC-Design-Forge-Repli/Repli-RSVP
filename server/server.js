const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const dayjs = require('dayjs')
require('dotenv').config();
const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const partyNamesRouter = require('./routes/partyNames.router');
const checkEventCodeRouter = require('./routes/checkEventCode.router')
const eventsRouter = require('./routes/events.router')
const mealsRouter = require('./routes/meals.router');
const remindersRouter = require('./routes/reminders.router');
const partyGuestsRouter = require('./routes/partyGuests.router');
const rsvpRouter = require('./routes/rsvp.router');
const pool = require('./modules/pool');



// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/checkEventCode', checkEventCodeRouter);
app.use('/api/events', eventsRouter)
app.use('/api/meals', mealsRouter);
app.use('/api/reminders', remindersRouter);
app.use('/api/partyGuests', partyGuestsRouter);
app.use('/api/rsvp', rsvpRouter);

// Party Names Router
app.use('/api/partyNames', partyNamesRouter);


// Reminders
// 00 */1 * * * *   every minute
// 30 15 * * *  every day at 3:30 
cron.schedule('30 15 * * *', function () {
  console.log('running a task every minute');
  const today = dayjs().format('YYYY-MM-DD')
  const sqlQuery = `
  SELECT * FROM "events"
  `
  pool.query(sqlQuery)
    .then((dbRes) => {
      const eventArray = dbRes.rows
      console.log(eventArray)
      for (let i = 0; i < eventArray.length; i++) {
        const dateToCheck = new Date(eventArray[i].event_deadline).toLocaleDateString('en-CA')
        let date1 = new Date(dateToCheck);
        let date2 = new Date(today);
        let Difference_In_Time = date2.getTime() - date1.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        console.log(Difference_In_Days)
      
        if (Difference_In_Days === -30) {
          getGuestsFromEvent(eventArray[i].id, 30) // array of objects
          
        }
        if (Difference_In_Days === -7) {
          getGuestsFromEvent(eventArray[i].id, 7) // array of objects
        
        }
      }
    })
});

function getGuestsFromEvent(eventId, daysAway) {
  let sqlQuery = `
  SELECT
  guests.id as guest_id,
  guests."name" AS guest_name, 
  guests.email_address as guest_email_address,
  guests.recieve_reminders as guest_recieve_reminders
 FROM
  "events"
  JOIN party ON events.id = party.event_id
  JOIN guests ON party.id = guests.party_id
  WHERE "events"."id" = $1
  GROUP BY guests.id;
  `
  let sqlValue = [eventId];
  pool.query(sqlQuery, sqlValue)
    .then((dbRes) => {
      const guestToSendRemindersTo = dbRes.rows
      for (let i = 0; i < guestToSendRemindersTo.length; i++) {
        if (guestToSendRemindersTo[i].guest_recieve_reminders === true) {
          const msg = {
            to: `${guestToSendRemindersTo[i].guest_email_address}`, // recipient 
            from: 'jeremyhanson506@outlook.com', // Change to your verified sender
            subject: `Event is ${daysAway} days away!`,
            text: `event is ${daysAway} days away`,
            html: `<strong>event is ${daysAway} days away</strong>`,
          }
          sendGridMail
            .send(msg)
            .then(() => {
              console.log('Email sent')
            })
            .catch((error) => {
              console.error(error)
            })
        }
      }
    })
    .catch((dbErr) => {
      console.log('Problem server side - Cant get the guests from the database to send reminders to.', dbErr)
    })
}


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
