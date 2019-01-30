DROP TABLE IF EXISTS users;

CREATE TABLE users (
id serial primary key,
first varchar(255) not null check (first <>''),
last varchar(255) not null check (last <>''),
email varchar(255) UNIQUE not null check (email <>''),
password varchar(255) not null check (password <>'')
);
