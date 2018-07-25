UPDATE users SET name = $2, email = $3, home_town = $4, img = $5, bio = $6
WHERE auth_id = $1;