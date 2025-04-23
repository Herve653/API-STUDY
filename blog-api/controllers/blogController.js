const Blog = require('../models/Blog');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username').populate('category', 'name');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'username')
      .populate('category', 'name');
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    
    const blog = new Blog({
      title,
      content,
      author: req.user.id,
      category,
      tags
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, category, tags, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBlogsByCategory = async (req, res) => {
  try {
    const blogs = await Blog.find({ category: req.params.categoryId })
      .populate('author', 'username')
      .populate('category', 'name');
    
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};