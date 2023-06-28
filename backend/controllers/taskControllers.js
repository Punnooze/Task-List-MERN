const taskModel = require('../models/taskModel');

module.exports.getTasks = async (req, res) => {
  const tasks = await taskModel.find();
  res.send(tasks);
};

module.exports.saveTask = (req, res) => {
  const { task } = req.body;
  taskModel
    .create({ task })
    .then((data) => {
      console.log('Saved Successfully');
      res.status(201).send(data);
    })
    .catch((error) => {
      console.log({ error: error, msg: 'something went wrong' });
    });
};


// module.exports.updateTask = (req, res) => {
//   const { id } = req.params;
//   const { task } = req.body;
//   taskModel
//     .findByIdAndUpdate(id , { task })
//     .then(() => res.send('Saved Successfully'))
//     .catch((error) => {
//       console.log(error);
//       res.send({ error: error, msg: 'Something went wrong' });
//     });
// };


module.exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  taskModel.findByIdAndUpdate(id, { task })
    .then(() => res.send("Updated successfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};



module.exports.deleteTask = (req, res) => {
  const { id } = req.params;
  taskModel
    .findByIdAndDelete(id)
    .then(() => res.send('Deleted Successfully'))
    .catch((error) => {
      console.log(error);
      res.send({ error: error, msg: 'Something went wrong' });
    });
};
