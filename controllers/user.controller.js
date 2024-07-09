const db = require('../db/db');
const fs = require('fs');
const path = require('path');

// Obtener todos los usuarios
const getAllUsers = (req, res) => {
    const sql = 'SELECT * FROM Users';
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err); // Muestra el error en la terminal
            return res.status(500).json({ error: "Intente más tarde" });
        }
        res.json(results);
    });
};

// Obtener usuario por ID
const getUserById = (req, res) => {
    const { UserID } = req.params;
    const sql = 'SELECT * FROM Users WHERE UserID = ?';
    db.query(sql, [UserID], (err, result) => {
        if (err) {
            console.log(err); // Muestra el error en la terminal
            return res.status(500).json({ error: "Intente más tarde" });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(result[0]);
    });
};

// Obtener usuario por email
const getUserByEmail = (Email) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM Users WHERE Email = ?';
        db.query(sql, [Email], (err, result) => {
            if (err) {
                console.log(err); // Muestra el error en la terminal
                return reject(err);
            }
            resolve(result[0]);
        });
    });
};

// Crear nuevo usuario
const createUser = (Name, Surname, Email, Password, Birthday, ProfilePicture, Countries_CountryID) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO Users (Name, Surname, Email, Password, Birthday, ProfilePicture, Countries_CountryID) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [Name, Surname, Email, Password, Birthday, ProfilePicture, Countries_CountryID];
        db.query(sql, values, (err, result) => {
            if (err) {
                console.log(err); // Muestra el error en la terminal
                return reject(err);
            }
            const newUser = {
                UserID: result.insertId,
                Name,
                Surname,
                Email,
                Password,
                Birthday,
                ProfilePicture,
                Countries_CountryID
            };
            const usersFilePath = path.join(__dirname, '../db/data/users.json');
            fs.readFile(usersFilePath, 'utf8', (err, data) => {
                if (err) {
                    console.log(err); // Muestra el error en la terminal
                    return reject(err);
                }
                const users = JSON.parse(data);
                users.push(newUser);
                fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        console.log(err); // Muestra el error en la terminal
                        return reject(err);
                    }
                    resolve(newUser);
                });
            });
        });
    });
};

// Actualizar usuario
const updateUser = (req, res) => {
    const { UserID } = req.params;
    const { Name, Surname, Email, Password, Birthday, ProfilePicture, Countries_CountryID } = req.body;
    const sql = 'UPDATE Users SET Name = ?, Surname = ?, Email = ?, Password = ?, Birthday = ?, ProfilePicture = ?, Countries_CountryID = ? WHERE UserID = ?';
    const values = [Name, Surname, Email, Password, Birthday, ProfilePicture, Countries_CountryID, UserID];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err); // Muestra el error en la terminal
            return res.status(500).json({ error: "Intente más tarde" });
        }
        res.json({ message: 'Usuario actualizado' });
    });
};

// Eliminar usuario
const deleteUser = (req, res) => {
    const { UserID } = req.params;
    const sql = 'DELETE FROM Users WHERE UserID = ?';
    db.query(sql, [UserID], (err, result) => {
        if (err) {
            console.log(err); // Muestra el error en la terminal
            return res.status(500).json({ error: "Intente más tarde" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({ message: 'Usuario eliminado' });
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};
