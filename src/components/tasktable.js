import React, { useEffect, useState } from "react";
import Header from "./header";
import "./tasktable.css";
import Sidebar from "./sidebar";
import { FcNext, FcPrevious } from "react-icons/fc";
function Tasktable() {
  const [sliderValue, setSliderValue] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 9;

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setSliderValue(value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Replace this with your actual task data
  const tasks = [
    {
      taskId: 1,
      taskName: "Task 1",
      assignedTo: "John Doe",
      priority: "High",
      dueDate: "2023-08-31",
    },
    {
      taskId: 2,
      taskName: "Task 2",
      assignedTo: "Jane Smith",
      priority: "Medium",
      dueDate: "2023-09-15",
    },
    {
      taskId: 3,
      taskName: "Task 21",
      assignedTo: "Samantha Johnson",
      priority: "Low",
      dueDate: "2023-10-10",
    },
    {
      taskId: 4,
      taskName: "Task 22",
      assignedTo: "Robert Williams",
      priority: "High",
      dueDate: "2023-10-15",
    },
    {
      taskId: 5,
      taskName: "Task 1",
      assignedTo: "John Doe",
      priority: "High",
      dueDate: "2023-08-31",
    },
    {
      taskId: 6,
      taskName: "Task 2",
      assignedTo: "Jane Smith",
      priority: "Medium",
      dueDate: "2023-09-15",
    },
    {
      taskId: 8,
      taskName: "Task 21",
      assignedTo: "Samantha Johnson",
      priority: "Low",
      dueDate: "2023-10-10",
    },
    {
      taskId: 9,
      taskName: "Task 22",
      assignedTo: "Robert Williams",
      priority: "High",
      dueDate: "2023-10-15",
    },
    {
      taskId: 10,
      taskName: "Task 1",
      assignedTo: "John Doe",
      priority: "High",
      dueDate: "2023-08-31",
    },
    {
      taskId: 11,
      taskName: "Task 2",
      assignedTo: "Jane Smith",
      priority: "Medium",
      dueDate: "2023-09-15",
    },
    {
      taskId: 12,
      taskName: "Task 21",
      assignedTo: "Samantha Johnson",
      priority: "Low",
      dueDate: "2023-10-10",
    },
    {
      taskId: 13,
      taskName: "Task 22",
      assignedTo: "Robert Williams",
      priority: "High",
      dueDate: "2023-10-15",
    },
    {
      taskId: 14,
      taskName: "Task 1",
      assignedTo: "John Doe",
      priority: "High",
      dueDate: "2023-08-31",
    },
    {
      taskId: 15,
      taskName: "Task 2",
      assignedTo: "Jane Smith",
      priority: "Medium",
      dueDate: "2023-09-15",
    },
    {
      taskId: 16,
      taskName: "Task 21",
      assignedTo: "Samantha Johnson",
      priority: "Low",
      dueDate: "2023-10-10",
    },
    {
      taskId: 17,
      taskName: "Task 22",
      assignedTo: "Robert Williams",
      priority: "High",
      dueDate: "2023-10-15",
    },
    {
      taskId: 18,
      taskName: "Task 1",
      assignedTo: "John Doe",
      priority: "High",
      dueDate: "2023-08-31",
    },
    {
      taskId: 19,
      taskName: "Task 2",
      assignedTo: "Jane Smith",
      priority: "Medium",
      dueDate: "2023-09-15",
    },
    {
      taskId: 20,
      taskName: "Task 21",
      assignedTo: "Samantha Johnson",
      priority: "Low",
      dueDate: "2023-10-10",
    },
    {
      taskId: 21,
      taskName: "Task 22",
      assignedTo: "Robert Williams",
      priority: "High",
      dueDate: "2023-10-15",
    },
    {
      taskId: 22,
      taskName: "Task 21",
      assignedTo: "Samantha Johnson",
      priority: "Low",
      dueDate: "2023-10-10",
    },
    {
      taskId: 23,
      taskName: "Task 22",
      assignedTo: "Robert Williams",
      priority: "High",
      dueDate: "2023-10-15",
    },
    {
      taskId: 24,
      taskName: "Task 21",
      assignedTo: "Samantha Johnson",
      priority: "Low",
      dueDate: "2023-10-10",
    },
    {
      taskId: 25,
      taskName: "Task 22",
      assignedTo: "Robert Williams",
      priority: "High",
      dueDate: "2023-10-15",
    },
    {
      taskId: 26,
      taskName: "Task 21",
      assignedTo: "Samantha Johnson",
      priority: "Low",
      dueDate: "2023-10-10",
    },
    {
      taskId: 27,
      taskName: "Task 22",
      assignedTo: "Robert Williams",
      priority: "High",
      dueDate: "2023-10-15",
    },
  ];

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="Tasktable mt-3">
        <div className="container task-table">
          <div className="table-container" id="table-to-export">
            <table className="table container table-striped">
              <thead>
                <tr>
                  <th scope="col">Task</th>
                  <th scope="col">Time & Date</th>
                  <th scope="col">Other Important Data</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
                <tr>
                  <th scope="col">Task ID</th>
                  <th scope="col">Task Name</th>
                  <th scope="col">Assigned To</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Completion</th>
                </tr>
              </thead>
              <tbody>
                {currentTasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.taskId}</td>
                    <td>{task.taskName}</td>
                    <td>
                      <div className="task-info">
                        <img
                          src="https://t3.ftcdn.net/jpg/02/36/48/86/360_F_236488644_opXVvD367vGJTM2I7xTlsHB58DVbmtxR.jpg"
                          alt="Task Icon"
                          className="task-icon"
                        />
                        {task.assignedTo}{" "}
                      </div>
                    </td>
                    <td>{task.priority}</td>

                    <td>{task.dueDate}</td>
                    <td className="text-center">
                      <div className="slider-container">
                        <input
                          type="range"
                          value={sliderValue}
                          min="0"
                          max="100"
                          step="1"
                          className="progress"
                          onChange={handleSliderChange}
                        />
                        <span>{sliderValue}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`pagination-button ${
                  currentPage === 1 ? "disabled" : ""
                }`}
                disabled={currentPage === 1}
              >
                <FcPrevious />
              </button>
              {Array.from({
                length: Math.ceil(tasks.length / tasksPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`pagination-button ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`pagination-button ${
                  currentPage === Math.ceil(tasks.length / tasksPerPage)
                    ? "disabled"
                    : ""
                }`}
                disabled={
                  currentPage === Math.ceil(tasks.length / tasksPerPage)
                }
              >
                <FcNext />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasktable;
