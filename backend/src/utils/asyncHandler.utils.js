/*
  ASYNC-HANDLER WRAPPER

  Takes a controller/middleware function as argument and returns a modified and structured async-function that either executes the function or sends error response to the client hitting the API

*/
export default  function asyncHandler(callbackFn) {
  return async function (req, res, next) {
    try {
      await callbackFn(req, res, next);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        statusCode: error.statusCode || 500,
        message: error.message.toString(),
      });
    }
  };
}
