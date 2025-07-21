exports.getUsers = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
