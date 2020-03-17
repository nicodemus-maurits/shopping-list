const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// @desc    Register new user
// @route   POST /api/v1/users
// @access  public
exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({
      msg: "Please enter all fields"
    });
  }

  // Check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      msg: "User already exists"
    });
  } else {
    const newUser = { name, email, password };
    // Create salt and hash
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        const savedUser = await User.create(newUser);
        jwt.sign(
          { id: savedUser.id },
          process.env.JWT_SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            return res.json({
              token,
              user: {
                id: savedUser.id,
                name: savedUser.name,
                email: savedUser.email
              }
            });
          }
        );
      });
    });
  }
};

// @desc    Add an item
// @route   POST /api/v1/items
// @access  public
