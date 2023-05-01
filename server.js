const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.get("/", (req, res) => {
  res.send({ msg: "Hello World israel" });
});


function validateInput(req, res, next) {
  const { username, password, email } = req.body;

  const validUsername = validateUsername(username);
  const validPassword = validatePassword(password);
  const validEmail = validateEmail(email);

  if (validUsername && validPassword && validEmail) {
    next();
  } else {
    res.status(401).send({ msg: "Invalid Input" });
  }
}

function validateUsername(username) {
  if (username.length > 3) {
    return true;
  } else {
    return false;
  }
}

function validatePassword(password) {
  if (
    password.length > 6 &&
    password.match(/[a-z]/g) &&
    password.match(/[A-Z]/g) &&
    password.match(/[0-9]/g)
  ) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  if (email.includes("@") && email.includes(".")) {
    return true;
  } else {
    return false;
  }
}

function auth(req, res, next) {
  const token = req.headers.authorization;
  if (token === "123456789") {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    res.status(200).send({ msg: "Login Success", token: "123456789" });
  } else {
    res.status(401).send({ msg: "Login Failed" });
  }
});

app.post("/register", (req, res) => {
  const { username, password, email } = req.body;
  if (validateInput(username, password, email)) {
    res.status(200).send({ msg: "Register Success" });
  } else {
    res.status(401).send({ msg: "Register Failed" });
  }
});

app.get("/admin", auth, (req, res) => {
  res.status(200).send({ msg: "Welcome Admin" });
});

app.get("/gallery", auth, (req, res) => {
  res.status(200).send({ msg: "Welcome Gallery" });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
