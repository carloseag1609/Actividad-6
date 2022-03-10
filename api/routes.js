const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("./index");

router.get("/test", (req, res) => {
  return res.send("Test");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send();
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send("Wrong credentials");
    } else {
      if (bcrypt.compareSync(passwsord, user.password)) {
        return res.status(200).send({
          user: {
            id: user.id,
            email: user.email,
          },
        });
      } else {
        return res.status(404).send("Wrong credentials");
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send();
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    return res.status(200).send("User registered");
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
