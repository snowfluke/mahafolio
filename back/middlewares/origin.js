// @ts-check

function origin(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_ORIGIN);
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, Authorization"
  );
  next();
}

module.exports = origin;
