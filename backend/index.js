import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connection } from "./DATABASE/db.js"
import route from "./rout/penguna_datarout.js"

dotenv.config();
const app = express();

app.use(cors({
    origin : "http://localhost:5173",
    Credential : true}));
app.use(express.json());
app.use(route);

app.listen(process.env.PORT, async() => {
    await connection();
    console.log(`http://localhost:${process.env.PORT}`);
});