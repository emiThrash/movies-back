const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const pool = require('../db/db.js');

const register = async (req, res) => {
  try {
    const { email, nombre, apellido, contrasena, fecha_nacimiento, id_pais } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 8);
    const sql = 'INSERT INTO usuarios (email, nombre, apellido, contrasena, fecha_nacimiento, id_pais) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [email, nombre, apellido, hashedPassword, fecha_nacimiento, id_pais];
    
    const [result] = await pool.query(sql, values);

    const token = jwt.sign({ user: email }, config.secretKey, { expiresIn: config.tokenExpiresIn });
    res.status(201).json({ auth: true, token });
  } catch (err) {
    console.error({ error: err });
    res.status(500).json({ error: "Intente más tarde" });
  }
};

const login = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    const sql = 'SELECT contrasena FROM usuarios WHERE email = ?';
    
    const [result] = await pool.query(sql, [email]);

    if (result.length === 0) {
      return res.status(404).json({ msg: `El email ${email} no se encuentra registrado` });
    }

    const passwordIsValid = await bcrypt.compare(contrasena, result[0].contrasena);

    if (!passwordIsValid) {
      return res.status(401).json({ auth: false, token: null });
    }

    const token = jwt.sign({ user: email }, config.secretKey, { expiresIn: config.tokenExpiresIn });
    res.status(200).json({ auth: true, token });
  } catch (err) {
    console.error({ error: err });
    res.status(500).json({ error: "Intente más tarde" });
  }
};

const perfil = async (req, res) => {
  try {
    const user = req.user;
    const sql = 'SELECT u.email, u.nombre, u.apellido, u.fecha_nacimiento, p.nombre AS pais FROM usuarios AS u INNER JOIN paises AS p ON u.id_pais = p.id WHERE u.email = ?';
    
    const [result] = await pool.query(sql, [user]);

    res.json(result);
  } catch (err) {
    console.error({ error: err });
    res.status(500).json({ error: "Intente más tarde" });
  }
};

module.exports = { register, login, perfil };