class BadRequestError extends Error {
  constructor(message, ...rest) {
    super(...rest);
    this.statusCode = 400;
    this.message = message;
    this.name = 'BadRequestError';
  }
}

module.exports = BadRequestError;
