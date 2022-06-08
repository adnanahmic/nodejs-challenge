import mongoose, { Schema, model } from 'mongoose'

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  published_at: {
    type: Date,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
  },
  private: {
    type: Boolean,
  },
})

export default model('Articles', schema)
