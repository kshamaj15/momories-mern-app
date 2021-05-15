import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import postRoutes from './routes/posts.js';

const app = express();

// middlewares
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
// app.use(cors);

// routes
app.use('/posts', postRoutes)

const DB_URL = 'mongodb+srv://kshamaj15:kshama100@cluster0.t5ojz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(5000, () => console.log(`server started running at port 5000`) )
    })
    .catch((err) => {
        console.error(err.message);
    })
