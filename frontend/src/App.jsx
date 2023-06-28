//import { useState } from 'react';

import { useEffect, useState } from 'react';
import List from './components/List';
import axios from 'axios';
import { baseURL } from './utils/constant';

function App() {
  const [input, setinput] = useState('');
  const [task, settask] = useState([]);
  const [updateUI, setupdateUI] = useState(false);
  const [updateId, setupdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      settask(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }).then((res) => {
      console.log(res.data);
      setinput('');
      setupdateUI((prevState) => !prevState);
    });
  };

  const updateMode = (id, text) => {
    console.log(text);
    setinput(text);
    setupdateId(id);
  };

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input }).then((res) => {
      console.log(res.data);
      setupdateUI((prevState) => !prevState);
      setupdateId(null);
      setinput('');
    });
  };

  return (
    <main>
      <h1 className="title">CRUD OPERATIONS</h1>
      <h2 className='title'>TASK LIST APP</h2>
      <div className="input_holder">
        <input
          type="text"
          value={input}
          onChange={(e) => setinput(e.target.value)}
        />
        <button type="submit" onClick={updateId ? updateTask : addTask}>
          {updateId ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <ul>
        {task.map((task) => (
          <List
            key={task._id}
            id={task._id}
            task={task.task}
            setUpdateUI={setupdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </main>
  );
}

export default App;
