class MissingEnvironmentVariableError extends Error {
  constructor(message) {
    super(`Missing environent variable(s) '${message}'`);
    this.name = 'MissingEnvironmentVariableError';
  }
}

module.exports = {
  MissingEnvironmentVariableError
};
