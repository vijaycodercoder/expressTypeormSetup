"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const db_1 = require("./db");
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.send('hello');
});
db_1.AppDataSource.initialize().then(() => {
    console.log('database connected');
}).catch((err) => console.log('errortest', err));
app.listen(port, () => {
    console.log(`port running on ${port}`);
});
