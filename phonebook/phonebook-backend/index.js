const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const Person = require("./models/person");
const app = express();

app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (request, response) => {
  if (request.method === "POST") {
    return JSON.stringify(request.body);
  }
  return "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response) => {
  const entriesCount = persons.length;
  const currentDate = new Date();

  response.send(`
    <p>Phonebook has info for ${entriesCount} people</p>
    <p>${currentDate.toString()}</p>
  `);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/notes/:id", (request, response) => {
  Person.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

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
    //id: generateId(),
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  person = persons.find((person) => person.id === id);

  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
