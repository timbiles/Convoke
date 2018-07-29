SELECT COUNT(events_id)
FROM user_events
WHERE events_id = $1;