const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

let users = [];
let nextId = 0;

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = {id: nextId++, name, email};

    users.push(newUser);
    res.status(201).json(newUser);
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { name, email } = req.body;
    const user = users.find(u => u.id === userId);

    if (user) {
        user.name = name;
        user.email = email;
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).send(); // 204 No Content
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// **************************************************************
// Do not touch the code below this comment
// **************************************************************

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
