import express from 'express';
import cors from 'cors';
import connectToMongo from "./db/db.js";
import userRoute from "./routers/user.route.js";

connectToMongo();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userRoute);

app.get('/', (req, res) => {
    res.send("Hello World");
});

export default app;