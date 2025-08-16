
const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// Debug middleware to log raw request body
router.use((req, res, next) => {
  console.log('Raw request body:', req.body);
  next();
});

// Test echo endpoint to verify request body parsing
router.post('/test-echo', (req, res) => {
  console.log('Test echo request body:', req.body);
  res.json({ receivedBody: req.body });
});

// Register endpoint using Supabase
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, username, idNumber, dob, role } = req.body;

    console.log('Supabase register request body:', req.body);

    console.log('Field values:', {
      email,
      password,
      name,
      username,
      idNumber,
      dob,
      role,
      types: {
        email: typeof email,
        password: typeof password,
        name: typeof name,
        username: typeof username,
        idNumber: typeof idNumber,
        dob: typeof dob,
        role: typeof role,
      }
    });

    if (!email || !password || !name || !username || !idNumber || !dob) {
      console.log('Missing required fields');
      if (!email) console.log('Missing email');
      if (!password) console.log('Missing password');
      if (!name) console.log('Missing name');
      if (!username) console.log('Missing username');
      if (!idNumber) console.log('Missing idNumber');
      if (!dob) console.log('Missing dob');
      // Removed role check temporarily
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Sign up user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log('Supabase signUp error:', JSON.stringify(error, null, 2));
      return res.status(400).json({ error: error.message, details: error });
    }

    // Insert additional user info into Supabase table
    const { user } = data;
    let tableName = 'users';
    if (role === 'admin') {
      tableName = 'admins';
    }
    const { error: insertError } = await supabase
      .from(tableName)
      .insert([
        {
          id: user.id,
          name: name,
          username,
          id_number: idNumber,
          dob,
          email,
        },
      ]);

    if (insertError) {
      console.log('Supabase insert error:', insertError);
      return res.status(400).json({ error: insertError.message });
    }

    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (err) {
    console.error('Supabase registration error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Login endpoint using Supabase
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Supabase login request body:', req.body);

    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ error: 'Missing email or password' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Supabase signIn error:', error);
      return res.status(401).json({ error: error.message });
    }

    res.status(200).json({ message: 'Login successful', user: data.user });
  } catch (err) {
    console.error('Supabase login error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

module.exports = router;
