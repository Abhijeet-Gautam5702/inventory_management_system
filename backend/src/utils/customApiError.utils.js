export default class CustomApiError extends Error {
  constructor(errorCode, message, errors = []) {
    // "message" is an in-built property of the in-built Error-class. So super() invokes the parent constructor (of the Error-class) to initialize this "message" property
    super(message);

    // Custom properties of customApiError class
    this.success = false;
    this.statusCode = errorCode;
    this.errors = errors;
  }
}
