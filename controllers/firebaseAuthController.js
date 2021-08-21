const FireUser = require('../models/firebaseUserModel')

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await FireUser.findOneAndUpdate(
    { email },
    { name: user.email.split('@')[0], picture },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new FireUser({
      email,
      name: user.email.split('@')[0],
      picture,
    }).save();
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }

};