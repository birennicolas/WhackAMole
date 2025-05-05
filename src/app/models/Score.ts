import mongoose from 'mongoose';

const ScoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters']
  },
  score: {
    type: Number,
    required: [true, 'Please provide a score'],
    min: [0, 'Score cannot be negative']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Score || mongoose.model('Score', ScoreSchema); 