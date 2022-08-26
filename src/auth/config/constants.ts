export const AUTH_CONSTANTS = {
  secret: process.env.AUTH_KEY || 'auth-key',
  tokenExpirationTime: process.env.AUTH_EXP_TIME || 1000 * 60 * 60 * 24 * 200, // 200 days
  refreshExpirationTime:
    process.env.AUTH_REFRESH_EXP || 1000 * 60 * 60 * 24 * 400, // 400 days
  saltRounds: process.env.AUTH_SALT_ROUNDS || 10,
  passwordRegex: process.env.PASSWORD_REGEX || /[A-Za-z0-9]+\d+/,
};
