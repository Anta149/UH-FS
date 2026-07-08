const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://anta149:${password}@cluster0.2s6rywt.mongodb.net/phonebook?appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// Mode 1: Fetch all entries if ONLY the password is provided
if (process.argv.length === 3) {
  console.log("phonebook");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
  // Mode 2: Add a new entry if name and number are also provided
} else if (process.argv.length === 5) {
  const newName = process.argv[3];
  const newNumber = process.argv[4];

  const person = new Person({
    name: newName,
    number: newNumber,
  });

  person.save().then(() => {
    console.log(`added ${newName} number ${newNumber} to phonebook`);
    mongoose.connection.close();
  });
}
// Edge case: Incomplete arguments
else {
  console.log(
    "Please provide either just the password, or password, name, and number.",
  );
  mongoose.connection.close();
}
