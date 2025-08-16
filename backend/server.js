const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const supabaseAuthRoutes = require('./routes/supabaseAuth');
app.use('/auth', supabaseAuthRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('StudyXpert backend is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
