CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR (80) UNIQUE NOT NULL,
	"password" VARCHAR(1000) NOT NULL
);

CREATE TABLE "events" (
	"id" SERIAL PRIMARY KEY,
	"event_host_id" INT REFERENCES "user",
	"event_name" VARCHAR(500),
	"deadline" VARCHAR(500),
	"location" VARCHAR(500) NOT NULL,
	"event_code" VARCHAR(500) UNIQUE NOT NULL,
	"event_date" VARCHAR(500) 
);

CREATE TABLE "party" (
	"id" SERIAL PRIMARY KEY,
	"event_id" INT REFERENCES "events",
	"name" VARCHAR(500) 
);

CREATE TABLE "guests" (
	"id" SERIAL PRIMARY KEY,
	"party_id" INT REFERENCES "party",
	"name" VARCHAR(500),
	"response" BOOLEAN DEFAULT FALSE,
	"meal_id" INTEGER,
	"phone_number" VARCHAR(500),
	"email_address" VARCHAR(500)
);

CREATE TABLE "meal_options" (
	"id" SERIAL PRIMARY KEY,
	"event_id" INT REFERENCES "events",
	"meal_name" VARCHAR(500),
	"description" VARCHAR(500)
);