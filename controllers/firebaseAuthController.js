const FireUser = require('../models/firebaseUserModel')

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await FireUser.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new FireUser({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  FireUser.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
