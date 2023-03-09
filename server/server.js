const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const partyNamesRouter = require('./routes/partyNames.router');
const checkEventCodeRouter = require('./routes/checkEventCode.router')
const createEventRouter = require('./routes/createEvent.router')
const mealsRouter = require('./routes/meals.router');
const remindersRouter = require('./routes/reminders.router');
const partyGustRouter = require('./routes/partyGuests.router');
const rsvpRouter = require('./routes/rsvp.router');


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
app.use('/api/createEvent', createEventRouter)
app.use('/api/meals', mealsRouter);
app.use('/api/reminders', remindersRouter);
app.use('/api/partyGuests', partyGustRouter);
app.use('/api/rsvp', rsvpRouter);

// Party Names Router
app.use('/api/partyNames', partyNamesRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
