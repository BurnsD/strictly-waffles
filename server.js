// Modules
const express = require('express');
const path =require('path');
const htmlROutes = ('./routes/htmlRoutes')
const apiRoutes = ('./routes/apiRoutes')
// Server
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware for static page
app.use(express.static('../public'));
app.use('/api', apiRoutes);
app.use('/', htmlROutes);

// Listening
app.listen(PORT, function() {
    HTMLFormControlsCollection.log("Server is running on PORT: " + PORT);
});