const Blog = require('../models/Blog');

const ownerCheck = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to perform this action' });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = ownerCheck;