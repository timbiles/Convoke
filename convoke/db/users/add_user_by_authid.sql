INSERT INTO users (email, auth_id, membership_date) VALUES ($1, $2, now()) RETURNING *;