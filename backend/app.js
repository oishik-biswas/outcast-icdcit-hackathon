import express from 'express';
import cors from 'cors';
import connectToMongo from "./db/db.js";
import userRoute from "./routers/user.route.js";
import messageRoute from "./routers/message.route.js";
import {app} from 'lib/socket.js';

connectToMongo();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userRoute);
app.use('/messages', messageRoute);

app.get('/', (req, res) => {
    res.send("Hello World");
});

export default app;