module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Don't expose internal errors in production
  const message =
    process.env.NODE_ENV === "production"
      ? "Something went wrong"
      : err.message || "Something went wrong";

  // HTML request
  if (req.accepts("html")) {
    return res.status(statusCode).render("error.ejs", {
      statusCode,
      message
    });
  }

  // JSON request
  res.status(statusCode).json({
    status: "error",
    message
  });
};
