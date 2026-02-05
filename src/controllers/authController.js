const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Temporary in-memory users
const users = [];

// REGISTER
exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email and password are required'
    });
  }

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    id: Date.now(),
    email,
    password: hashedPassword
  });

  res.status(201).json({ message: 'User registered successfully' });
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
};
