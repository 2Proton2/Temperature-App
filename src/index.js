/**
 * initialization
 */
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const templateFolderPath = path.join(__dirname, '../templates');
const port = '3000';
const getTempFunc = require('../middlewares/paramBoundLogic.js');

/**
 * setting up the bodyParser
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//console.log(path.join(__dirname, './public/home.css'))


/**
 * setting up the view engine
 * setting up the view folder
 */
app.set('view engine', 'hbs');
app.set('views', templateFolderPath);

/**
 * setting up the partials
 */
console.log("dir", path.join(__dirname, "../templates/partials"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"))

app.use(express.static('public'));

/**
 * setting up the routes
 */
app.get("/", (req, res) => {
    res.render("home")
})

app.post("/", (req, res) => {
    let cityTempDetails = getTempFunc(req.body.city)
    .then((data) =>
        res.render("home", {
        backendData: data
    }))
    .catch((err) => {
        console.log(err);
    });
})


/**
 * listening the port
 */
app.listen(port, () => {
    console.log(`Server is connected to http://localhost:${port}/`)
})