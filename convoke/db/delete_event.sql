-- DELETE FROM events WHERE events_id = $1;

DELETE FROM user_events WHERE users_id = $1 AND events_id = $2;