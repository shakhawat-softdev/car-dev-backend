// utils/response.js
export const sendSuccess = (res, message = "Success", data = {}) => {
  res.status(200).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res,
  message = "An error occurred",
  error = null,
  statusCode = 500
) => {
  res.status(statusCode).json({
    success: false,
    message,
    error: error ? error.toString() : undefined,
  });
};
