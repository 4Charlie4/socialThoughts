const jwt = require("jsonwebtoken");

//in actual projects make sure to store secret in env file.
const secret = "secretshcookiesh";
const expiration = "2h";

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  authMiddleware: function ({ req }) {
    //allows token to be sent via these means
    let token = req.body.token || req.query.token || req.headers.authorization;

    //takes bearer away from token value
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    //if no token returns req
    if (!token) {
      return req;
    }

    try {
      //decodes user data and attaches to request object
        //.verify method checks if secret matches .sign method's secret that was passed in.
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid token");
    }
    //returns updated data
    return req;
  },
};
