var config = require("./config");
var express = require("express");
var bodyParser = require("body-parser");
var extras = require("express-extras");
var nodemailer = require("nodemailer");
var validator = require("validator");

var app = express();
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: config.email
});

function cleanup (str) {
  return typeof str == "string" ? str.trim() : "";
}

app.use(bodyParser.json());
app.use(extras.fixIP());

app.post("/contact", extras.throttle(), function (req, res) {
  var name = cleanup(req.body.name);
  var email = cleanup(req.body.email);
  var comments = cleanup(req.body.comments);

  if (!name.length || !validator.isEmail(email) || !comments.length) {
    return res.status(400).end();
  }

  transporter.sendMail({
    from: name + "<" + email + ">",
    to: "David Kosub <dave@davidkosub.com>",
    subject: "Contact Form Submission",
    text: comments
  }, function (err) {
    res.status(err ? 500 : 200).end();
    console.error(err);
  });
});

app.use(express.static(__dirname + "/public"));
app.listen(8080);
