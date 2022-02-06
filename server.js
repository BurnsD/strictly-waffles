// Modules
const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");
const app = express();
const PORT = process.env.PORT || 8008;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Static Middleware
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, function() {
    console.log("App is running at https://localhost/" + PORT);
})