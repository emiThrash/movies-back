const idHandler = (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ msg: "Invalid ID" });
  }

  req.id = id;
  next();
};

module.exports = idHandler;
