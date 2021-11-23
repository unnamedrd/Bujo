const express = require("express");
const connectDB = require("./config/db");
const app = express();
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
//Connect Database
connectDB();

//Init Middleware
app.use(express.json({extended: false}))

//Define API Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

//Server static assets
app.get("/login", (req, res) => {
    res.render('login');
});

app.get("/register", (req, res) => {
    res.render('register');
});

app.get("/journal", (req, res) => {
    res.render('journal');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));