const User = require("../models/User");
const bcrypt = require("bcrypt");
const salt = 10;
const jwt = require("jsonwebtoken");
const SECRET = "123XYZ";

exports.registerUser = async (req, res) => {
  if (req.body.name && req.body.password && req.body.email) {
    try {
      var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt), //for generation of hash
      });
      await user.save();
      res.send({ type: "success", msg: "Account created successfully" });
    } catch (err) {
      console.log(err);
      res.send({ type: "error", msg: "Failed to create the user" });
    }
  } else {
    res.send({ type: "error", msg: "Data field empty" });
  }
};

exports.login = async (req, res) => {
  if (req.body.email && req.body.password) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user.email) {
        var match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          delete user._doc.password;
          delete user._doc.__v;
          const token = jwt.sign(
            {
              _id: user._id,
              email: user.email,
              name: user.name,
            },
            SECRET,
            { expiresIn: "24h" }
          );
          console.log('Token: -------> ', token);
          res.cookie("token", token, { maxAge: 900000, httpOnly: true, sameSite: "lax" });
          res.send(user);
        }
      } else {
        res.send({ type: "error", msg: "Wrong email" });
      }
    } catch (err) {
      console.log(err);
      res.send({ type: "error", msg: "Failed to login" });
    }
  } else {
    res.send({ type: "error", msg: "Data field empty" });
  }
};

exports.authorizeToken = (req, res, next) => {
  if (req.cookies.token) {
    jwt.verify(req.cookies.token, SECRET, (err, decoded) => {
      if (!err) {
        req.user = decoded;
        next();
      } else {
        res.cookie("token", "");
        console.log(err)
        res.status(401).send({ msg: "ACCESS_DENIED" });
      }
    });
  } else {
    res.cookie("token", "");
    res.status(401).send({ msg: "ACCESS_DENIED" });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const data = await User.findOne({ _id: req.user._id });
    if (data) {
      res.send(data);
    } else {
      logout();
    }
  } catch (err) {
    console.log(err);
    logout();
  }
};

exports.logout = (req, res) => {
  res.cookie("token", "");
  res.send({ msg: "Logged out" });
};