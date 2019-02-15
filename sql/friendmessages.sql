DROP TABLE IF EXISTS friendmessages;

CREATE TABLE friendmessages(
    id SERIAL PRIMARY KEY,
    message VARCHAR(500) NOT NULL,
    user_id INTEGER NOT NULL,
    friendship_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
