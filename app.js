const path = require("path");
const passport = require("passport");

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const aws = require("aws-sdk");

const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const venues = require("./routes/api/venues");
const upload = require("./routes/api/upload");
require("./config/passport")(passport);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    AWS.config.update({
      accessKeyId: aws.accessKeyId,
      secretAccessKey: aws.secretAccessKey,
    });
    let s3 = new AWS.S3();
    async function getImage() {
      const data = s3
        .getObject({
          Bucket: "companyimages",
          Key: "your stored image",
        })
        .promise();
      return data;
    }
    getImage()
      .then((img) => {
        let image =
          "<img src='data:image/jpeg;base64," + encode(img.Body) + "'" + "/>";
        let startHTML = "<html><body></body>";
        let endHTML = "</body></html>";
        let html = startHTML + image + endHTML;
        res.send(html);
      })
      .catch((e) => {
        res.send(e);
      });
    function encode(data) {
      let buf = Buffer.from(data);
      let base64 = buf.toString("base64");
      return base64;
    }
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Busque"));
app.use("/api/users", users);
app.use("/api/venues", venues);
app.use("/api/upload", upload);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
