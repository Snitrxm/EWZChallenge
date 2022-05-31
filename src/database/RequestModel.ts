import { Schema } from 'mongoose'
import mongoose from 'mongoose'

const RequestModel = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  requestID: { type: String, required: true },
  description: { type: String, required: false },
  itemsQuantity: { type: Number, required: false },
  unityValue: { type: Number, required: false },
  sincDate: { type: String, required: false },
  day: { type: String, required: false },
  clientName: { type: String, required: false },
  clientEmail: { type: Array, required: false },
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{timestamps: true});

export default mongoose.model('Request', RequestModel);