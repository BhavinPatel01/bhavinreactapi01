const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const Petvaccination = require("./schema");
const url = "mongodb+srv://bhavinbhavik0110:2PJgmOOsYBm7EryO@bhavin.andzlj1.mongodb.net/PetVaccinationRecords?retryWrites=true&w=majority&appName=Bhavin";
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const cors = require("cors");
  //   //   const corsOptions = {
  //   //     origin: "https://vvpsyg-3000.csb.app/record",
  //   //     host: "https://rtvxv2.csb.app/*",
  //   //   };
  app.use(cors());
  var responce;
  app.get("/", async (req, res) => {
    responce = await Petvaccination.find();
    res.send(responce);
  });

  app.get("/Record/:id", async (req, res) => {
    responce = await Petvaccination.findOne({ VaccinationID: req.params.id });
    res.send(responce);
  });

  app.post("/Record", async (req, res) => {
    const record = new Petvaccination({
      VaccinationID: req.body.VaccinationID,
      PetName: req.body.PetName,
      VaccinationType: req.body.VaccinationType,
      VaccinationDate: req.body.VaccinationDate,
      NextDueDate: req.body.NextDueDate
    });
    await record.save();
    console.log(record);
    //res.send(record);
  });

  app.put("/record/:id", async (req, res) => {
    const record = await Petvaccination.findOne({ VaccinationID: req.params.id });
    record.PetName = req.body.PetName;
    record.VaccinationType = req.body.VaccinationType;
    record.VaccinationDate = req.body.VaccinationDate;
    record.NextDueDate = req.body.NextDueDate;
    await record.save();
    console.log(record);
    // res.send(record)
  });

  app.delete("/record/:id", async (req, res) => {
    const record = await Petvaccination.findOne({ VaccinationID: req.params.id });
    await record.delete();
    console.log(record);
    res.send(record);
  });

  app.listen(3000, () => {
    console.log("server started");
  });
});
