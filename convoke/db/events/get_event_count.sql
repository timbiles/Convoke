SELECT COUNT(events_id)
FROM user_events
WHERE events_id = $1;

-- SELECT * FROM user_events as u 
-- JOIN EVENTS as e
-- ON u.events_id = e.events_id
-- WHERE u.events_id = $1;