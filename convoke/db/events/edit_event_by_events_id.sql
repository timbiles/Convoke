UPDATE events SET title = $2, host = $3, date = $4, time = $5, description = $6
WHERE events_id = $1;