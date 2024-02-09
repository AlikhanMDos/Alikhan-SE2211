// app.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });


const cors = require('cors'); // Import the cors middleware
const path = require('path'); // Import the path module

const express = require('express');
const bodyParser = require('body-parser');
const Blog = require('./models/Blog'); // Adjust the path if needed
const app = express();
const PORT = 8888;


// Use cors middleware
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, this is the root of the server!');
});

app.use(bodyParser.json());


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to handle requests to the root URL and serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Create
app.post('/blogs', async (req, res) => {
    try {
        const { title, body, author } = req.body;

        // Validate data
        if (!title || !body) {
            return res.status(400).json({ error: 'Title and body are required fields' });
        }

        const newBlog = await Blog.create({
            title,
            body,
            author,
        });

        res.status(201).json(newBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Read
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /blogs/:id
app.get('/blogs/:id', async (req, res) => {
  try {
      const { id } = req.params;

      // Implement logic to retrieve a single blog post by ID
      const blog = await Blog.findById(id);

      // Check if the blog post with the provided ID exists
      if (!blog) {
          return res.status(404).json({ error: 'Blog post not found' });
      }

      res.status(200).json(blog);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /blogs/search?title=example
app.get('/blogs/search', async (req, res) => {
  try {
      const { title } = req.query;

      // Validate if the title parameter is provided
      if (!title) {
          return res.status(400).json({ error: 'Title parameter is required for search' });
      }

      // Implement logic to search for blog posts by title
      const blogs = await Blog.find({ title: new RegExp(title, 'i') });

      res.status(200).json(blogs);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Update
app.put('/blogs/:id', async (req, res) => {
    try {
        const { title, body, author } = req.body;
        const { id } = req.params;

        // Validate data
        if (!title || !body) {
            return res.status(400).json({ error: 'Title and body are required fields' });
        }

        // Update blog post in the database
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, body, author },
            { new: true }
        );

        // Check if the blog post with the provided ID exists
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        res.status(200).json(updatedBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete
app.delete('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the blog post with the provided ID exists
        const existingBlog = await Blog.findById(id);
        if (!existingBlog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        // Delete the blog post from the database
        await Blog.findByIdAndDelete(id);

        res.status(204).end(); // 204 No Content response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
