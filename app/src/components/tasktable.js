import React, { useState } from "react";
import Header from "./Header";
import "../Styles/tasktable.css";
import Sidebar from "../components/sidebar";
import { FcNext, FcPrevious } from "react-icons/fc";

function Tasktable() {
  const [sliderValue, setSliderValue] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  // Replace this with your actual task data
  const tasks = [
    {
      taskId: 1,
      taskName: "Task 1",
      assignedTo: "John Doe",
      priority: "High",
      dueDate: "2023-08-31",
      iconUrl: "https://example.com/task1-icon.png",
    },
    // ... other tasks
  ];

  const tasksPerPage = 9;

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setSliderValue(value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
                  {/* Table headers */}
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
                    {/* Table cells */}
                    <td>{task.taskId}</td>
                    <td>{task.taskName}</td>
                    <td>
                      <div className="task-info">
                        <img
                          src={task.iconUrl}
                          alt="Task Icon"
                          className="task-icon"
                        />
                        {task.assignedTo}
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
