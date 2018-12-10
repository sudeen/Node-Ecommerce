module.exports = {

  database: 'mongodb://root:abc123@ds115434.mlab.com:15434/ecommerce',
  port: 9000,
  secretKey: "sudin123",

  facebook: {
    clientID: process.env.FACEBOOK_ID || '1342762535863776',
    clientSecret: process.env.FACEBOOK_SECRET || 'a8f2b2b802deff3230ecf5b83a449c98',
    profileFields: ['emails', 'displayName'],
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  }
}
