const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save().then(() => {
            res.send(task);
        })
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        await Task.find({}).then(task => {
            res.send(task);
        })
    } catch (e) {
        res.status(400).send(e.message);
    }
})

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const task = await Task.findById(req.params.id);
        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router;