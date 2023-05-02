import { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import ListItem from "./components/ListItem";

const baseURL = "/tasks";

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  const fetchTasks = async () => {
    try {
      // axios anruf durchführen
      const response = await axios.get(baseURL);
      const data = response.data;

      //console.log(data);

      setList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleNewTask = async (evt) => {
    evt.preventDefault();
    //if (task === "") return;
    try {
      const response = await axios.post(baseURL, {
        task: task,
      });

      setList((prev) => [...prev, response.data]);
      //setList([...list, task]);
      setTask("");
    } catch (error) {
      console.log(error);
    }
  };

  //
  const deleteAll = async () => {
    try {
      await axios.delete(baseURL);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAll = (evt) => {
    evt.preventDefault();
    deleteAll();
    setList([]);
  };

  //console.log(list);
  return (
    <div className="app">
      <h1>Task List MERN</h1>
      <form onSubmit={handleNewTask}>
        <label>
          Add a new task
          <input
            required={true}
            type="text"
            value={task}
            onChange={(evt) => setTask(evt.target.value)}
          />
        </label>
        <div className="buttonWrapper">
          <button>New task</button>
          <button onClick={handleDeleteAll}>Delete all</button>
        </div>
      </form>
      <div className="listWrapper">
        <ul>
          {list.map((el, index) => (
            <ListItem
              key={index}
              task={el.task}
              list={list}
              setList={setList}
              id={el._id}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
