# Simple Blogging Platform API

A lightweight CRUD API for a simple blogging platform built with Node.js and MongoDB.

## Setup and Initialization

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/simple-blog-api.git
   ```

2. **Install Dependencies:**
   ```bash
   cd simple-blog-api
   npm install
   ```

3. **Set Up MongoDB:**
   - Ensure you have MongoDB installed locally or provide the connection URI in `app.js`.

## API Endpoints

- **Create a new blog post:**
  ```http
  POST /blogs
  ```

- **Retrieve all blog posts:**
  ```http
  GET /blogs
  ```

- **Retrieve a single blog post by ID:**
  ```http
  GET /blogs/:id
  ```

- **Update a blog post by ID:**
  ```http
  PUT /blogs/:id
  ```

- **Delete a blog post by ID:**
  ```http
  DELETE /blogs/:id
  ```

## Database

- Uses native MongoDB methods for database operations (find, insertOne, updateOne, deleteOne, etc.).
- Handles errors and returns appropriate responses and HTTP status codes.

## Data Validation

- Implements data validation to ensure all blog post submissions contain a title and body.

## Error Handling

- Includes proper error handling for database errors and bad requests.

## Blog Post Structure

- Each post includes a title, body, author, and timestamps.

## Usage

1. **Start the Server:**
   ```bash
   npm start
   ```

2. **Access the API:**
   - Base URL: `http://localhost:8888`

## Postman Commands

- Use Postman or any API testing tool to interact with the API.
  - Create: `POST /blogs`
  - Retrieve all: `GET /blogs`
  - Retrieve by ID: `GET /blogs/:id`
  - Update by ID: `PUT /blogs/:id`
  - Delete by ID: `DELETE /blogs/:id`

## Author

- Your Name

---

Feel free to customize the sections and details according to your project specifics.
