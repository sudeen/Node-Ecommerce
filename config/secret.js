module.exports = {

  database: 'mongodbURLin MLAB',
  port: 9000,
  secretKey: "sudin123",

  facebook: {
    clientID: process.env.FACEBOOK_ID || 'youAppId',
    clientSecret: process.env.FACEBOOK_SECRET || 'appSecret',
    profileFields: ['emails', 'displayName'],
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  }
}
