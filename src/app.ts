import express from "express";

import 'reflect-metadata'
import { AppDataSource } from "./db";
const cors = require('cors');


const port = 3000;
const app = express();
app.use(express.json())
app.use(cors());



app.use('/api', require('./routes/routes'))


AppDataSource.initialize().then(() => {
    console.log('database connected')
}).catch((err) => console.log('errortest', err))

app.listen(port, () => {
    console.log(`port running on ${port}`)
})