-- CREATE DATABASE db;

CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  disease VARCHAR(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS records (
  id SERIAL PRIMARY KEY,
  patient_id int,
  date DATE NOT NULL,
  indicator NUMERIC NOT NULL,
  CONSTRAINT fk_patient
    FOREIGN KEY(patient_id) 
      REFERENCES patients(id)
);

INSERT INTO patients (id, name, disease)
VALUES (1, 'John Doe', 'Diabetes'), (2, 'Jane Smith', 'Hypertension');

INSERT INTO records (id, patient_id, date, indicator)
VALUES
  (1, 1, '2020-01-01', 8.5),
  (2, 1, '2020-06-01', 8.7),
  (3, 1, '2021-01-01', 9.0),
  (4, 2, '2020-03-15', 140),
  (5, 2, '2020-09-15', 142),
  (6, 2, '2021-03-15', 143);