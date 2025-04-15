export const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
};

export const errorResponse = (res, error, message = 'Error', statusCode = 500) => {
  res.status(statusCode).json({
    status: 'error',
    message,
    error: error.message || error,
  });
};
