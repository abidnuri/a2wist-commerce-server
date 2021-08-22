const admin = require("../firebase/index");
const FireUser = require("../models/firebaseUserModel")

exports.authCheck = async (req, res, next) => {
  // console.log(req.headers); // token
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

//Admin checking
exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await FireUser.findOne({ email }).exec();

  if (adminUser.role !== 'admin') {
    res.status(403).json({
      err: "Admin resources. Access denied"
    })
  } else {
    next();
  }
}