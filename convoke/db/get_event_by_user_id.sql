-- SELECT * FROM user_events WHERE user_id = $1;

SELECT * FROM user_events as u 
JOIN EVENTS as e
ON u.events_id = e.events_id
WHERE u.users_id = $1
ORDER BY date;