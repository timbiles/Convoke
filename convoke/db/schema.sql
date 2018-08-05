-- users table

CREATE TABLE users (
    users_id SERIAL PRIMARY KEY,
    name character varying(100),
    bio character varying(500),
    auth_id text,
    home_town character varying(100),
    img text,
    email character varying(200)
);

-- events table

CREATE TABLE events (
    events_id SERIAL PRIMARY KEY,
    title character varying(100),
    host character varying(100),
    date date,
    time text,
    description character varying(500),
    img text,
    location text,
    users_id integer REFERENCES users(users_id)
);

-- user_events table

CREATE TABLE user_events (
    id SERIAL PRIMARY KEY,
    users_id integer REFERENCES users(users_id),
    events_id integer REFERENCES events(events_id)
);
