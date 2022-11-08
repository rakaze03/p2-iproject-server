const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authUser = async (req, res, next) => {
  try {
    let access_token = req.headers.access_token;
    if (!access_token) {
      throw { name: "Unauthorized" };
    }
    let payload = verifyToken(access_token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Unauthorized" };
    }
    req.user = {
      id: payload.id,
      username: payload.username,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authUser;
