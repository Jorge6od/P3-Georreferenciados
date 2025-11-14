function logErrors(err, req, res, next) {
  console.error(err);
  next(err); //Al enviarle err entiende que es un middleware de error
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

module.exports = { logErrors, errorHandler };
