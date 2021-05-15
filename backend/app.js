import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';

const app = express();

// middlewares
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use((req, res, next) => {
    if(!req.url.includes('/auth/login')) {
        const token = req.headers['authorization'];
        const accessToken = token && token.split(' ')[1];
        if(!accessToken) return res.status(401).json({message: 'Please send valid access token'});
    
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(403).json({message: 'Please send valid access token'});
            req.user = user;
        })
    }
    next();
})
// app.use(cors);

// routes
app.use('/posts', postRoutes)
app.use('/auth', authRoutes)

const DB_URL = 'mongodb+srv://kshamaj15:kshama100@cluster0.t5ojz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(5000, () => console.log(`server started running at port 5000`) )
    })
    .catch((err) => {
        console.error(err.message);
    })
