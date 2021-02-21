CREATE DATABASE db_registro;

USE db_registro;

-- TABLE USER
-- all pasword wil be encrypted using SHA1
CREATE TABLE users (
  id INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;




-- TABLE MATERIAS
CREATE TABLE subjects(
  id INT(11) NOT NULL,
  title VARCHAR(150) NOT NULL,
  profesor TEXT,
  description TEXT,
  user_id INT(11),
  created_at timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);
ALTER TABLE subjects
  ADD PRIMARY KEY (id);

ALTER TABLE subjects
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE subjects;


CREATE TABLE grades (
  id INT(11) NOT NULL,
  grade DOUBLE PRECISION NOT NULL,
  percentage INT NOT NULL,
  description TEXT,
  user_id INT(11),
  subject_id INT(11),
  CONSTRAINT fk_user1 FOREIGN KEY(user_id) REFERENCES users(id),
  CONSTRAINT LF_subject FOREIGN KEY(subject_id) REFERENCES subjects(id)
);

ALTER TABLE grades
  ADD PRIMARY KEY (id);

ALTER TABLE grades
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;



DESCRIBE grades;