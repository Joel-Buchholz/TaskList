import React, { useState } from "react";
import trash from "../assets/trash.svg";
import pen from "../assets/pen.svg";
import axios from "axios";

export default function ListItem({ task, list, setList, id }) {
  const [edit, setEdit] = useState(false);
  const [newTask, setNewTask] = useState("");

  const handleDelete = async () => {
    try {
      await axios.delete(
        `/tasks/${id}`
      );

      const filteredList = list.filter((el) => {
        return el._id != id;
      });

      console.log({ filteredList });
      setList(filteredList);
    } catch (error) {
      console.log(error);
    }
  };

  //
  const handleEditClick = () => {
    setEdit(true);
    setNewTask(task);
  };

  //
  const handleEdit = async () => {
    if (newTask !== "") {
      try {
        const res = await axios.put(
          `/tasks/${id}`,
          {
            task: newTask,
          }
        );

        const updateTaskId = list.findIndex((el) => el._id === id);

        const updatedTaskItem = (list[updateTaskId].task = newTask);

        setNewTask(updatedTaskItem);

        const newList = list.map((el) => {
          if (el === newTask) return newTask;
          return el;
        });

        setList(newList);
        setNewTask("");
      } catch (error) {
        console.log(error);
      }

      setEdit(false);
    } else {
      alert("Bitte fügen Sie Information ins Updatefeld ein!");
      setEdit(false);
    }
  };

  return (
    <>
      <li>
        {task}
        <div className="imageWrapper">
          <img src={pen} onClick={handleEditClick} alt="" />
          <img src={trash} onClick={handleDelete} alt="" />
        </div>
      </li>
      {edit ? (
        <div className="editWrapper">
          <input
            value={newTask}
            onChange={(evt) => setNewTask(evt.target.value)}
            className="editTask"
          />
          <button onClick={handleEdit}>OK</button>
        </div>
      ) : null}
    </>
  );
}
