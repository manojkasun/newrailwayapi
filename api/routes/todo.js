const router = require('express').Router();
const Todo = require('../models/Todo');


router.post('/', async(req, res) => {



    const todo = new Todo({
        
        details: req.body.details,
        date: req.body.date,
        donorID: req.body.donorID,
        hospitel: req.body.hospitel,
        hospitelContact: req.body.hospitelContact,
        hospitelAddress: req.body.hospitelAddress,
        taskName:req.body.taskName,
        reqId: req.body.reqId,
    });
    try {
        const savedtask = await todo.save();

        res.send({
            messege: 'success'
        });
    } catch (err) {
        res.send({
            messege: 'error'
        });
    }
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Todo.find({donorID: id})
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
        res.status(200).json(doc);
    }
    else{
        res.status(404).json({message: 'No Task Found that id' });
    }
    })
    .catch(err => {
        console.log(err);
    res.status(500).json({error: err});
});
})
/* router.post('/gettodo', async(req, res) => {

   

    const todo = await Todo.find({
        donorID: req.body.donorID,
    });

    res.send(todo);

}); */
/* router.post('/removetodo', async(req, res) => {

    try {
        await Todo.deleteOne({
            _id: req.body.taskid
        });
        res.send({ "message": "success" });
    } catch (error) {
        res.send({ error });
    }
}); */
router.delete('/:id', (req, res, next) => {
    Todo.deleteOne({_id: req.params.id})
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
        res.status(200).json(doc);
    }
    else{
        res.status(404).json({message: 'No Task Deleted' });
    }
})
    .catch();
    });


module.exports = router;
