//----Module loading----/
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const { json } = require("express");
//----Env. file .env variables  Activation----//
require("dotenv").config();
//----server initialization----//
const app = express();
app.use(formidable()); //----To use POST and Body exchange----//
app.use(cors()); //----Protect site's content----//
//----Loading MailGun----//
const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAIL_GUN_DOMAIN,
});
//----Create route /form----//
app.post("/form", (req, res) => {
  const { firstname, lastname, email, message } = req.fields;
  console.log(req.fields);
  const data = {
    from: `${firstname} ${lastname} <${email}>`,
    to: process.env.MAILGUN_MAIL,
    subject: `Formulaire envoyé par ${firstname}`,
    text: message,
  };
  console.log(data);
  //----Mailgun posting message----//
  mailgun.messages().send(data, (error, body) => {
    console.log(error);
    console.log(body);
    if (error) {
      res.status(400).json(error);
      console.log(error);
    }
    if (body) {
      res.status(200).json(body);
      console.log(body);
    }
  });
});

//----Route security----//
app.all("*", () => {
  res.status(404).json({ message: "cette route n'existe pas" });
  console.log({ message: "Requête invalide!" });
});
//-----Start server----//
app.listen(3000, () => {
  console.log("server started 🚀");
});
