 const express = require("express");
 const dotenv = require('dotenv');
 const cors = require('cors');
 const cookieParser = require("cookie-parser");

 const connectToMongoDB = require('./db/db');
 const authRoutes = require("./Routes/authRoutes");
 const purchaseRoutes = require("./Routes/purchaseRoutes");
  



 dotenv.config();

 const app = express();


 app.use(cors());
 app.use(express.json());
 app.use(cookieParser());

const PORT = process.env.PORT || 3000;



 


app.use("/api/auth", authRoutes);

app.use("/api/purchases", purchaseRoutes);


 connectToMongoDB();

 app.listen(`${PORT}`, () => {
    console.log(`server is running on port ${PORT}`)});