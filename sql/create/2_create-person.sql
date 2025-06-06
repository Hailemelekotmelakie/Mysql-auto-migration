    
CREATE TABLE  person (
  id int(11) NOT NULL AUTO_INCREMENT,
  firstName varchar(255) NOT NULL,
  lastName varchar(255) DEFAULT NULL,
  email varchar(255) NOT NULL,
  userId int(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES user(id),
  UNIQUE KEY(email)
);

-- Hailemelekotmelakie1991@gmail.com
-- +251947053537

 

 