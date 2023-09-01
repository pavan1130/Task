import React, { useState } from "react";
import "./Taskpopup.css";
function Taskpopup({ onTaskAdded }) {
  const [taskData, setTaskData] = useState({
    taskId: "",
    taskName: "",
    assignedTo: "",
    priority: "",
    dueDate: "",
    completion: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onTaskAdded(taskData);
    setTaskData({
      taskId: "",
      taskName: "",
      assignedTo: "",
      priority: "",
      dueDate: "",
      completion: 0,
    });
  };

  return (
    <div className="add-task-popup">
      <h3>Add Task</h3>
      <form>
        <div className="form-group">
          <label htmlFor="taskId">Task ID</label>
          <input
            type="text"
            id="taskId"
            name="taskId"
            value={taskData.taskId}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="taskName">Task Name</label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            value={taskData.taskName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="assignedTo">Assigned To</label>
          <input
            type="text"
            id="assignedTo"
            name="assignedTo"
            value={taskData.assignedTo}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <input
            type="text"
            id="priority"
            name="priority"
            value={taskData.priority}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="completion">Completion (%)</label>
          <input
            type="range"
            id="completion"
            name="completion"
            min="0"
            max="100"
            step="1"
            value={taskData.completion}
            onChange={handleInputChange}
          />
          <span>{taskData.completion}%</span>
        </div>
        <button type="button" onClick={handleSubmit}>
          Add Task
        </button>
      </form>
    </div>
  );
}

export default Taskpopup;
