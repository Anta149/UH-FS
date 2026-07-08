const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const Person = require("./models/person");
const app = express();

app.use(express.json());
app.use(express.static("dist"));

// Logging with morgan middleware
morgan.token("body", (request, response) => {
  if (request.method === "POST") {
    return JSON.stringify(request.body);
  }
  return "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

// ------ API Routes --------
app.get("/info", (request, response) => {
  const entriesCount = persons.length;
  const currentDate = new Date();

  response.send(`
    <p>Phonebook has info for ${entriesCount} people</p>
    <p>${currentDate.toString()}</p>
  `);
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  /*
  const nameExists = persons.find(
    (person) => person.name.toLowerCase() === body.name.toLowerCase(),
  );

  if (nameExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
  */

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id).then((person) => {
    response.status(204).end();
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
