import { Schema } from 'mongoose'
import mongoose from 'mongoose'

const UserModel = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    token: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
},
{timestamps: true});

export default mongoose.model('User', UserModel);