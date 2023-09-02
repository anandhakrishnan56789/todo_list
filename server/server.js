const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());


mongoose
  .connect("mongodb+srv://anandhakrishnan56789:aka123and@cluster1.emjykuj.mongodb.net/anandh?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));


const todoSchema = new mongoose.Schema({
  text: String,
});

const Todo = mongoose.model("Todo", todoSchema);


app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching todos" });
  }
});

app.post("/api/todos", async (req, res) => {
  const { text } = req.body;
  try {
    const newTodo = new Todo({ text });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating todo" });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findByIdAndRemove(id);
    if (!deletedTodo) {
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.json(deletedTodo);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting todo" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
