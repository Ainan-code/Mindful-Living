 const express = require("express");



 const app = express();


 app.get("/api/auth", authRoutes );


 app.listen(3000, () => {
    console.log("server is running on port 3000")});