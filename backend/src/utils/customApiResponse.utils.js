export default class CustomApiResponse {
  constructor(statusCode, message, data) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
