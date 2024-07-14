const bcrypt = require("bcrypt");
const pool = require("../db/db.js");

const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query("select * from Users");
    res.status(200).json(result);
  } catch (err) {
    console.error({ error: err });
    res.status(500).json({ msg: "Error getting all users" });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.id;
    const [result] = await pool.query("select * from Users where UserID=?", [
      id,
    ]);

    if (result.length === 0) {
      res.status(404).json({ msg: `User with id '${id}' not found` });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    console.error({ error: err });
    res.status(500).json({ msg: "Error getting the user" });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      name,
      surname,
      email,
      password,
      birthday,
      profilePicture,
      country,
    } = req.body;

    const [userInDatabase] = await pool.query(
      "select * from Users where Email=?",
      [email]
    );

    if (userInDatabase.length !== 0) {
      res
        .status(409)
        .json({ msg: `User with name '${email}' already in database` });
    } else {
      const saltRounds = 10;
      const hashedPass = await bcrypt.hash(password, saltRounds);

      const [result, data] = await pool.query(
        "insert into Users values (null, ?, ?, ?, ?, ?, ?, ?) ",
        [name, surname, email, hashedPass, birthday, profilePicture, country]
      );

      if (result.affectedRows > 0) {
        res
          .status(201)
          .json({ msg: `User with email '${email}' succesfully created` });
      }
    }
  } catch (err) {
    console.error({ error: err });
    res.status(500).json({ msg: "Error creating the user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.id;
    const [result] = await pool.query("delete from Users where UserID=?", [id]);

    if (result.affectedRows > 0) {
      res.status(200).json({ msg: `User with id '${id}' succesfully deleted` });
    } else {
      res.status(404).json({ msg: `User with id '${id}' not found` });
    }
  } catch (err) {
    console.error({ error: err });
    res.status(500).json({ msg: "Error deleting the user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.id;
    const {
      name,
      surname,
      email,
      password,
      birthday,
      profilePicture,
      country,
    } = req.body;

    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password, saltRounds);

    const [result] = await pool.query(
      "update Users set Name=?, Surname=?, Email=?, Password=?, Birthday=?, ProfilePicture=?, Countries_CountryID=? where UserID=?",
      [name, surname, email, hashedPass, birthday, profilePicture, country, id]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ msg: `User with id ${id} succesfully updated` });
    } else {
      res.status(404).json({ msg: `User with id '${id}' not found` });
    }
  } catch (err) {
    console.error({ error: err });
    res.status(500).json({ msg: "Error updating the user" });
  }
};
module.exports = { getUsers, getUser, createUser, deleteUser, updateUser };
