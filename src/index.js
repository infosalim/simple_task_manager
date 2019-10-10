const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save().then(() => {
            res.status(201).send(user);
        })
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        await User.findById(_id).then(user => {
            {
                !user ? res.status(404).send() : res.send(user)
            }
        })
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        { !user ? res.status(404).send() : res.send(user) }
    } catch (e) {
        return res.status(400).send(e);
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            res.status(400).send()
        }

        res.send(user);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save().then(() => {
            res.send(task);
        })
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        await Task.find({}).then(task => {
            res.send(task);
        })
    } catch (e) {
        res.status(400).send(e.message);
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        await Task.findById(_id).then(task => {
            {
                !task ? res.status(404).send() : res.send(task)
            }
        })
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        return res.status(400).send(e);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            res.status(400).send();
        }

        res.send(task);
    } catch (e) {
        return res.status(500).send(e);
    }
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});