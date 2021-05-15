import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    console.log(req.body);
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch(err) {
        res.status(404).json({ message: err.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json({ message: 'new post created', newPost: newPost });
    } catch(err) {
        res.status(409).json({ message: err.message });
    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if(id === 'all') {
        await PostMessage.remove()
        return res.status(200).json({message: 'All removed'});
    }

    if(!mongoose.isValidObjectId(id))
    return res.status(404).json({message: 'Not Found'});

    await PostMessage.findByIdAndRemove(id);
    res.status(200).json(`post with id ${id} is deleted`);
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const updatedPost = req.body;

    if(!mongoose.isValidObjectId(id))
    return res.status(404).json({message: 'Not Found'});

    await PostMessage.findByIdAndUpdate(id, updatedPost);
    res.status(200).json({message: `post with id ${id} is updated`, updatedPost: updatedPost});
}
