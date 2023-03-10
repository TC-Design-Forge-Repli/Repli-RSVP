CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR (80) UNIQUE NOT NULL,
  "password" VARCHAR (1000) NOT NULL
);
CREATE TABLE "events" (
	"id" SERIAL PRIMARY KEY,
	"event_host_id" INT REFERENCES "user",
	"event_name" VARCHAR(500) NOT NULL,
	"event_deadline" DATE NOT NULL,
	"event_location" VARCHAR(500) NOT NULL,
	"event_code" VARCHAR NOT NULL,
	"event_date" DATE NOT NULL
);

CREATE TABLE "party" (
	"id" SERIAL PRIMARY KEY,
	"event_id" INT REFERENCES "events",
	"name" VARCHAR(500) NOT NULL
);
CREATE TABLE "meal_options" (
	"id" SERIAL PRIMARY KEY,
	"event_id" INT REFERENCES "events",
	"meal_name" VARCHAR(500) NOT NULL,
	"description" VARCHAR(500)
);

CREATE TABLE "guests" (
	"id" SERIAL PRIMARY KEY,
	"party_id" INT REFERENCES "party",
	"name" VARCHAR(500) NOT NULL,
	"response" BOOLEAN DEFAULT NULL,
	"meal_id" INT REFERENCES "meal_options",
	"phone_number" VARCHAR(20),
	"email_address" VARCHAR(500),
	"recieve_reminders" BOOLEAN DEFAULT FALSE
);