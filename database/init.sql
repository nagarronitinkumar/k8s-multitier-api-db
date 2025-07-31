CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  address VARCHAR(255)
);

INSERT INTO users (name, description)
VALUES
  ('Nitin Kumar', 'nitin.kumar@example.com', 'Delhi'),
  ('Nikhil Sharma', 'nikhil.sharma@example.com', 'Noida'),
  ('Aman', 'aman@example.com', 'Gurugram'),
  ('Seema', 'Seema@example.com', 'Delhi'),
  ('Gurpreet Kaur', 'gurpreet.kaur@example.com', 'Delhi'),
  ('Robin Sharma', 'robin.sharma@example.com', 'Haridwar');