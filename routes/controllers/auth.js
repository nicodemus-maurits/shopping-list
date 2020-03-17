const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// @route   POST /api/v1/auth
// @desc    Authenticate user
// @access  public
exports.authUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({
      msg: "Please enter all fields"
    });
  }

  // Check for existing user
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({
      msg: "User does not exists"
    });
  } else {
    // Validate password
    const isMatch = await bcryptjs.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid credentials"
      });
    } else {
      jwt.sign(
        { id: existingUser.id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          return res.json({
            token,
            user: {
              id: existingUser.id,
              name: existingUser.name,
              email: existingUser.email
            }
          });
        }
      );
    }
  }
};

// @route   GET /api/v1/auth
// @desc    Get user data
// @access  Private
exports.authUserData = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};
