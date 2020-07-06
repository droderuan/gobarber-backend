export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: process.env.APP_EXPIRES === 'dev' ? '7d' : '2d',
  },
};
