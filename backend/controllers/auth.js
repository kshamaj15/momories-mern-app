import mongoose from 'mongoose';
import Users from '../models/users.js';
import env from 'dotenv';
import jwt from 'jsonwebtoken';

env.config();

export const login = (req, res) => {
    const username = req.body.username;
     const token = jwt.sign({name: username}, process.env.ACCESS_TOKEN_SECRET);
     res.json({accessToken: token});
}
