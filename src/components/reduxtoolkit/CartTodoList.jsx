import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, clearAll, updateItem } from './slices/ListSlice';
import CartNav from './CartNav';

function CartTodoList() {
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null); // To Track the index of the task being edited
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.cart.items);

  const AddTask = () => {
    if (newTask.trim() !== '') {
      dispatch(addItem(newTask));
      setNewTask('');
    }
  };

  const DeleteTask = (index) => {
    dispatch(deleteItem(index));
  };

  const ClearAll = () => {
    dispatch(clearAll());
  };

  const UpdateTask = () => {
    if (newTask.trim() !== '') {
      dispatch(updateItem({ index: editIndex, updatedTask: newTask }));
      setNewTask('');
      setEditIndex(null); // Reset edit state after updating
    }
  };

  const StartEditing = (index) => {
    setNewTask(tasks[index]); // Set the input value to the task's current value
    setEditIndex(index); // Marking the task being edited
  };

  return (
    <div className='outerDiv'>
      <center>
        <div className="flex items-center justify-between mb-6 relative">
          <h1 className="font-bold"><u>TO DO LIST CART</u></h1>
          <span> </span>
          <span>
            <div className="cartDiv">
              <CartNav />
            </div>
          </span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="add-button" onClick={editIndex !== null ? UpdateTask : AddTask}>
            {editIndex !== null ? 'Update Item' : 'Add Item'}
          </button>
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li key={index}>
                {task}
                <span className='btnSpan'>
                <button className="update-button" onClick={() => StartEditing(index)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => DeleteTask(index)}>
                  Delete
                </button>
                </span>
              </li>
            ))}
          </ul>
          <button className="clear-button" onClick={ClearAll}>
            Clear All
          </button>
        </div>
      </center>
    </div>
  );
}

export default CartTodoList;
