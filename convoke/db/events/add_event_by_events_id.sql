INSERT INTO user_events (events_id, users_id) values($1, $2)
RETURNING *;

