const express= require("express");
const { createTodo, updateTodo } = require("./types");
const {todo}= require("./db")
const app = express();
const cors= require("cors");
app.use(express.json());
app.use(cors());
/*
body expectation:
- title: string
- description: string


*/
const port= 3000;
app.post("/todo", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    // put it in mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        msg: "Todo created"
    })
})


app.get("/todos", async (req, res)=>{
    const todos=  await todo.find({})
    res.json({
        todos: todos});
})

app.delete("/flush", async (req, res)=>{
    try {
        await todo.deleteMany({});
        res.status(200).send('All todos have been deleted');
    } catch (error) {
        console.error('Error deleting todos:', error);
    }
})

app.put('/completed', async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = updateTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        return res.status(411).json({
            msg: "Input type does not match"
        });
    }

    try {
        await todo.findByIdAndUpdate(req.body.id, { completed: true });
        res.status(200).json({ msg: "To Do is completed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

app.listen(port);
console.log(`The app is listening on ${port} Port.`)