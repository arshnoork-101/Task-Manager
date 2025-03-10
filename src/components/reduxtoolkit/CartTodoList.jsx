import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, clearAll, updateItem } from "./slices/ListSlice";
import CartNav from "./CartNav";

function CartTodoList() {
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.cart.items);

// Load tasks from local storage on component mount
useEffect(() => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    JSON.parse(storedTasks).forEach((taskObj) =>
      // Passing the full object to store both task and status to LS
      dispatch(addItem(taskObj)) 
    );
  }
}, [dispatch]);


// Save tasks to local storage whenever tasks change
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

const AddTask = () => {
  if (newTask.trim() !== "") {
    // Dispatching Item
    dispatch(addItem({ task: newTask, status: "Pending" })); 
    setNewTask("");
  }
};

  const DeleteTask = (index) => {
    dispatch(deleteItem(index));
    setNewTask("");
    // If the index being edited is to be deleted, reset edit mode.
    if (editIndex === index) {
      setEditIndex(null);  
    }
  };  

  const ClearAll = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to delete all tasks?"
    );
    if (confirmClear) {
      dispatch(clearAll());
      setNewTask("");
    }
  };

  const UpdateTask = () => {
    if (newTask.trim() !== "") {
      dispatch(updateItem({ index: editIndex, updatedTask: newTask }));
      setNewTask("");
      setEditIndex(null);
    }
  };

  const StartEditing = (index) => {
    setNewTask(tasks[index].task);
    setEditIndex(index);
  };

  return (
    <div className="outerDiv">
      <br />
      <center>
        <h1 className="font-bold">CART YOUR TASKS</h1>
        <br /> <br />
        <div className="secClass">
          <input
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                editIndex !== null ? UpdateTask() : AddTask();
              }
            }}
          />
          <button
            className="add-button"
            onClick={editIndex !== null ? UpdateTask : AddTask}
          >
            {editIndex !== null ? "Update Item" : "Add Item"}
          </button>
          <div className="cartDiv">
            <CartNav />
          </div>
        </div>
        <center>
          <ul className="task-list">
            {tasks.map((taskObj, index) => (
              <li key={index} className={`myLI ${editIndex === index ? "editing-task" : "myLI"}`}>
                {taskObj.task}
                <select value={taskObj.status} onChange={(e) =>
                    dispatch(
                      updateItem({ index, updatedStatus: e.target.value })
                    )
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
                <button className="update-button" onClick={() => StartEditing(index)}>
                  {editIndex === index ? "Editing..." : "Edit"}
                </button>
                <button className="delete-button" onClick={() => DeleteTask(index)} >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </center>
        <button className="clear-button" onClick={ClearAll}>
          Clear All
        </button>
      </center>
    </div>
  );
}

export default CartTodoList;
