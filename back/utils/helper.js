// @ts-check

const sendError = (error) => {
  if (error.name === "ValidationError") {
    let errors = {};

    Object.keys(error.errors).forEach((key) => {
      if (key !== "score") {
        errors[key] = error.errors[key].message;
      }
    });

    return { statusCode: 400, error: errors };
  }
  return { statusCode: 500, error: "Terjadi kesalahan di server internal" };
};

module.exports = { sendError };
