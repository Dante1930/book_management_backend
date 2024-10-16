const jwt = require('jsonwebtoken');


const generateToken = (user) => {
  const payload = {
    user: {
      id: user.id, // Add more user properties if needed
    },
  };

  // Sign and return the token
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = generateToken;
