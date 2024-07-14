const { loginMidd } = require("./loginMidd");

const errorHandler = (err, req, res, next) => {
  loginMidd(`${err.name}: ${err.message}`, "errLog.log");
  console.error(err.stack);
  res.status(500).send(err.message);
};

module.exports = errorHandler;
