const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const cors = require("cors");

//spread .env file to all server
dotenv.config();

// connect to DB
connectDB();
let isConnected = false;
// async function connectMongoDB() {
//     try{
//         await connectDB();
//         isConnected = true;
//         console.log("connected to DB");
//     }catch(err){
//         console.log("error in connecting to DB",err);
//     }
// }

const app = express();

app.use(cors());
app.use(express.json());
// app.use((req,resp,next)=>{
//     if(!isConnected)
//     {
//         connectMongoDB();
//     }
//     next();
// })


app.use("/api/v1/test",require("./Routes/testRoute"));
app.use("/api/v1/auth",require("./Routes/authRoute"));
app.use("/api/v1/user",require("./Routes/userRoutes"));

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`server is listning on port ${port}`.bgMagenta);
})
// module.exports = app;