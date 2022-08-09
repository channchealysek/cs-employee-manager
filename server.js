const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');
const dataRoutes = require('./routes/dataRoutes');
const getInputTask = require("./lib/UserInputTask");

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('db'));

// Use dataRoutes
app.use('/grud', dataRoutes);

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
    getInputTask();
};