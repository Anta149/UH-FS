const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Blog = require("../controllers/models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

// 1. Reset the database before every single test
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test("blogs are returned as json and correct amount exists", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("unique identifier property of blogs is named id", async () => {
  const response = await api.get("/api/blogs");

  // Grab the first blog from the array returned by the API
  const firstBlog = response.body[0];

  // assert.ok checks that the value exists (is truthy)
  assert.ok(firstBlog.id);

  // Also verify that the old Mongo '_id' has been removed
  assert.strictEqual(firstBlog._id, undefined);
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Async/Await simplifies async code",
    author: "Full Stack Open",
    url: "https://fullstackopen.com/",
    likes: 42,
  };

  // 1. Send the POST request
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  // 2. Fetch all blogs from the database again to verify the state
  const response = await api.get("/api/blogs");

  // 3. Verify the total count increased by 1
  assert.strictEqual(response.body.length, initialBlogs.length + 1);

  // 4. Verify the contents of the newly added blog exist in the database
  const titles = response.body.map((b) => b.title);
  assert.ok(titles.includes("Async/Await simplifies async code"));
});

test("a blog can be deleted", async () => {
  // 1. Fetch the blogs currently in the database
  const blogsAtStart = await Blog.find({});
  const blogToDelete = blogsAtStart[0];

  // 2. Send the DELETE request using its ID
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  // 3. Verify total count decreased by 1
  const blogsAtEnd = await Blog.find({});
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

  // 4. Verify that the specific blog's title is no longer in the database
  const titles = blogsAtEnd.map((r) => r.title);
  assert.ok(!titles.includes(blogToDelete.title));
});

test("a blog's likes can be updated", async () => {
  const blogsAtStart = await Blog.find({});
  const blogToUpdate = blogsAtStart[0];

  // Define the changes you want to send
  const updatedLikesData = {
    likes: blogToUpdate.likes + 10, // Increase current likes by 10
  };

  // Send the PUT request
  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedLikesData)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  // Verify the response contains the updated likes count
  assert.strictEqual(response.body.likes, blogToUpdate.likes + 10);
});

// 2. Close the database connection when all tests finish
after(async () => {
  await mongoose.connection.close();
});
