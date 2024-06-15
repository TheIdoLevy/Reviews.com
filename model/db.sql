CREATE TABLE users (
  id uuid PRIMARY KEY,
  email varchar(100),
  password varchar(255),
  username varchar(45)
);

CREATE TABLE reviews (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  title varchar(50) UNIQUE NOT NULL,
  author varchar(45) NOT NULL,
  date date,
  time time,
  img varchar(400),
  rating int,
  content varchar(2000) NOT NULL,
  subject varchar(30) NOT NULL
);

CREATE TABLE user_history(
  user_id uuid REFERENCES users(id) NOT NULL,
  reviews int,
  likes int,
  liked int,
  bookmarked uuid[]
);
