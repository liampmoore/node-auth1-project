module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
        console.log(res.session.user)
      next();
    } else {
      res.status(401).json({ you: "You shall not pass!" });
    }
  };
  