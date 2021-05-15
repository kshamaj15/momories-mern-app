import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
})

const Users = mongoose.model('Users', UserSchema);

export default Users;
