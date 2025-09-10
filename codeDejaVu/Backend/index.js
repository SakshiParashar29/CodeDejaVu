import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { database } from './Database/db.js';
import router from './Routes/Routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

database()
    .then(() => {
        app.listen(port, () => {
            console.log(`App is listening on port Number: ${port}`);
        })
    })
    .catch((err) => {
        console.log("Error: ", err);
        process.exit(1);
    })

app.use("/api", router)