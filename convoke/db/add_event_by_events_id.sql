INSERT INTO user_events (events_id, user_id) values($1, $2)
RETURNING *;