CREATE DATABASE IF NOT EXISTS `movies`;
USE `movies`;

CREATE TABLE `countries`(
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(45) UNIQUE NOT NULL
);

CREATE TABLE `users`(
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(45) UNIQUE NOT NULL,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `birth_date` DATE NOT NULL,
    `country_id` INT NOT NULL,
    FOREIGN KEY(`country_id`) REFERENCES `countries` (`id`)
);

CREATE TABLE `categories`(
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL
);

CREATE TABLE `movies`(
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(45) UNIQUE NOT NULL,
    `release_year` YEAR NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `director` VARCHAR(45) NOT NULL,
    `category_id` INT NOT NULL,
    FOREIGN KEY(`category_id`) REFERENCES `categories` (`id`)
);

INSERT INTO `countries` (`name`) VALUES 
('United States of America'), 
('Germany'), 
('Argentina'), 
('Australia'), 
('Belgium'), 
('Brazil'), 
('Canada'), 
('China'), 
('South Korea'),
('Spain'), 
('India'), 
('France'),
('Italy');

INSERT INTO `categories` (`name`) VALUES 
('Action'), 
('Adventure'), 
('Science Fiction'), 
('Comedy'), 
('Documentary'), 
('Drama'), 
('Fantasy'), 
('Musical'), 
('Horror'), 
('Thriller'), 
('Animation'), 
('Romance');

INSERT INTO `movies` (`title`, `release_year`, `description`, `director`, `category_id`) VALUES 
('Barbie', 2023, 'After being expelled from Barbieland for not being a perfect-looking doll, Barbie sets off to the human world to find true happiness.', 'Greta Gerwig', 4), 
('Suicide Squad', 2016, 'The worst villains from prisons and psychiatric hospitals, all possessing special qualities, are released by the government to form an elite fighting team to stop a mysterious and powerful entity. Meanwhile, the Joker acts on his own, sowing chaos in his path.', 'David Ayer', 1), 
('Promising Young Woman', 2020, 'Cassie had a bright future ahead of her, until an unexpected event derailed her career.', 'Emerald Fennell', 10), 
('Babylon', 2022, 'Decadence, depravity, and outrageous excess lead to the rise and fall of several ambitious dreamers in 1920s Hollywood.', 'Damien Chazelle', 4), 
('Saltburn', 2023, 'Felix Catton invites his university friend, Oliver Quick, to his family residence for an unforgettable summer.', 'Emerald Fennell', 10);
