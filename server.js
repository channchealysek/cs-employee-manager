const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const router = express.Router();
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const getInputTask = require("./lib/UserInputTask");

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('db'));

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        init();
    });
});



init = () => {
    console.log("|---------------------------------|")
    console.log("|                                 |")
    console.log("|        EMPLOYEE MANAGER         |")
    console.log("|                                 |")
    console.log("|---------------------------------|")
    getInputTask();
};