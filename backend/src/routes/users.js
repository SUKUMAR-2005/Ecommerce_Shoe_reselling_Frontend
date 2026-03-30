import express from 'express';
const router = express.Router();
// TODO: Import User model

// GET all users (admin only)
router.get('/', async (req, res) => {
  // ...fetch users logic...
  res.json([]);
});

// GET single user
router.get('/:id', async (req, res) => {
  // ...fetch single user logic...
  res.json({});
});

// POST create user (register)
router.post('/', async (req, res) => {
  // ...register user logic...
  res.status(201).json({});
});

// PUT update user
router.put('/:id', async (req, res) => {
  // ...update user logic...
  res.json({});
});

// DELETE user
router.delete('/:id', async (req, res) => {
  // ...delete user logic...
  res.status(204).end();
});

export default router;
