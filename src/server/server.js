import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ideas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create Idea Schema
const ideaSchema = new mongoose.Schema({
  title: String,
  ideaOwner: String,
  mentorAlias: String,
  projectDescription: String,
  epSubArea: String,
  domain: String,
  level: String,
  duration: String,
  preRequisites: String,
  references: String,
  comments: String
}, { timestamps: true });

const Idea = mongoose.model('Idea', ideaSchema);

// Routes
app.post('/api/ideas', async (req, res) => {
  try {
    const idea = new Idea(req.body);
    await idea.save();
    res.status(201).json(idea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/ideas', async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/ideas/:id', async (req, res) => {
    console.log(req.body);
  try {
    const { id } = req.params;
    console.log(id);
    const updatedIdea = await Idea.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedIdea) {
      return res.status(404).json({ error: 'Idea not found' });
    }
    res.json(updatedIdea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 