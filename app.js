const express = require("express");
const app = express();


const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Busque"));

app.listen(port, () => console.log(`Server is running on port ${port}`));
