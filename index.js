const express = require("express");
const app = express();
const path = require("path");

const port = 8080;

app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.use(express.static(path.join(__dirname, "/public/samples")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.listen(port, () => {
    console.log(`Server is listening at ${port} port`);
});

app.get("/sp/:name", (req, res) => {
    const { name } = req.params;
    const instadata = require("./data.json");
    const data = instadata[name];

    if (!data) {
        return res.render("error.ejs");
    }

    console.log(data);
    res.render("home.ejs", { data });
});