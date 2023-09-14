import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { FcNext, FcPrevious } from "react-icons/fc";

import "../Styles/tasktable.css";
import Sidebar from "../components/sidebar";

function Tasktable() {
  const [taskFormVisible, setTaskFormVisible] = useState(false);
  const [newTask, setNewTask] = useState({
    taskId: "",
    taskName: "",
    assignedTo: "",
    priority: "Low",
    dueDate: "",
    completion: "Completed", // Default completion status
  });

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  useEffect(() => {
    // Load tasks from the server or local storage when the component mounts
    const tasksData = localStorage.getItem("tasksData");
    if (tasksData) {
      setTasks(JSON.parse(tasksData));
    } else {
      // Fetch tasks from the server or initialize an empty array
      axios.get("http://localhost:5000/tasks").then((response) => {
        setTasks(response.data);
      });
    }
  }, []);

  const handleAddTaskClick = () => {
    setTaskFormVisible(true);
  };

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleSubmitTask = async () => {
    try {
      // Send a POST request to the server to create a new task
      const response = await axios.post("http://localhost:5000/tasks", newTask);

      // Check if the request was successful (status code 201 indicates success)
      if (response.status === 201) {
        // Handle the response data if needed
        const createdTask = response.data;

        // Update the tasks state with the newly created task
        setTasks([...tasks, createdTask]);

        // Reset the form fields to their initial values
        setNewTask({
          taskId: "",
          taskName: "",
          assignedTo: "",
          priority: "Low",
          dueDate: "",
          completion: "Completed", // Reset completion status
        });

        // Close the task form
        setTaskFormVisible(false);

        // Optionally, show a success message to the user
        alert("Task created successfully!");
      } else {
        // Handle unexpected response statuses
        console.error(
          "Server returned an unexpected status code:",
          response.status
        );
        alert("Unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error creating task:", error);
      alert("Error creating task. Please try again later.");
    }
  };

  async function downloadPDF() {
    const input = document.getElementById("table-to-export");
    if (!input) {
      console.error("Element with id 'table-to-export' not found.");
      return;
    }

    const pdf = new jsPDF("l", "mm", "a4"); // Landscape mode
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const titleText = "Cutover Automation Tool";
    const headerX = 10;
    const startY = 30; // Initial y-position for table headers
    const lineHeight = 10; // Line height for each row
    const itemsPerPage = 30; // Number of items to display per page

    pdf.setTextColor(255, 0, 0);
    pdf.setFontSize(24); // Title font size
    const titleWidth =
      (pdf.getStringUnitWidth(titleText) * pdf.internal.getFontSize()) /
      pdf.internal.scaleFactor;
    const titleX = (pdfWidth - titleWidth) / 2;
    const titleY = 10;
    pdf.text(titleText, titleX, titleY, { align: "center" });

    pdf.setTextColor(0, 0, 0);

    // Function to add date, time, and page number
    function addPageContent(pageNum) {
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      const content = `Date: ${currentDate} | Time: ${currentTime} | Page: ${pageNum}`;
      pdf.text(content, pdfWidth / 2, pdfHeight - 10, { align: "center" });
    }

    let currentPage = 1;
    let dataIndex = 0;

    while (dataIndex < currentTasks.length) {
      if (currentPage > 1) {
        pdf.addPage();
      }

      // Set font size and style for table headings
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12); // Header font size

      // Define column widths and positions
      const colWidths = [20, 60, 40, 20, 40, 20]; // Adjust as needed
      const colPositions = [headerX];
      for (let i = 0; i < colWidths.length - 1; i++) {
        colPositions.push(colPositions[i] + colWidths[i]);
      }

      // Add table headers
      pdf.text("Task ID", colPositions[0], startY);
      pdf.text("Task Name", colPositions[1], startY);
      pdf.text("Assigned To", colPositions[2], startY);
      pdf.text("Priority", colPositions[3], startY);
      pdf.text("Due Date", colPositions[4], startY);

      // Adjust the X position for "Completion" to align with smaller data
      const completionX = colPositions[5] - -20; // Adjust as needed
      pdf.text("Completion", completionX, startY);

      // Reset font size for data
      pdf.setFontSize(10);

      // Add table data for the current page
      for (let i = 0; i < itemsPerPage; i++) {
        if (dataIndex >= currentTasks.length) {
          break;
        }
        const task = currentTasks[dataIndex];
        const y = startY + (i + 1) * lineHeight;

        // Adjust the X position for "Completion" data
        const completionValue = `${task.completion}`;
        const completionValueX =
          completionX +
          (colWidths[5] -
            (pdf.getStringUnitWidth(completionValue) *
              pdf.internal.getFontSize()) /
              pdf.internal.scaleFactor);
        pdf.text(completionValue, completionValueX, y, { align: "left" });

        // Adjust the X positions for other columns as needed
        pdf.text(`${task.taskId}`, colPositions[0], y, { align: "left" });
        pdf.text(`${task.taskName}`, colPositions[1], y, { align: "left" });
        pdf.text(`${task.assignedTo}`, colPositions[2], y, { align: "left" });
        pdf.text(`${task.priority}`, colPositions[3], y, { align: "left" });
        pdf.text(`${task.dueDate}`, colPositions[4], y, { align: "left" });

        dataIndex++;
      }

      // Add page number and move to the next page
      addPageContent(currentPage);
      currentPage++;
    }

    pdf.save("document.pdf");
  }
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  // Filter tasks based on the selected completion status
  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.completion === filter);

  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tasks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Task List");
    XLSX.writeFile(workbook, "task-list.xlsx");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const excelData = XLSX.utils.sheet_to_json(sheet);

      // Update the state with the Excel data
      setTasks(excelData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSaveClick = () => {
    try {
      // Convert tasks data to JSON string
      const tasksJSON = JSON.stringify(tasks);

      // Store JSON string in local storage
      localStorage.setItem("tasksData", tasksJSON);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div>
      <div className="Header">
        <div className="container header-container">
          <div className="row">
            <div className="col-4">
              <h5>Add Task</h5>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <button
                type="button"
                className="btn header-btn ms-4"
                onClick={handleAddTaskClick}
              >
                Add Task
              </button>
              <label htmlFor="file-upload" className="btn header-btn ms-4">
                Upload
              </label>
              <input
                type="file"
                id="file-upload"
                accept=".xlsx, .xls"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <button
                type="button"
                className="btn header-btn ms-4"
                onClick={downloadPDF}
              >
                Download PDF
              </button>
              <button
                type="button"
                className="btn header-btn ms-4"
                onClick={downloadExcel}
              >
                Download Excel
              </button>
              <Link to="/save">
                <button
                  type="button"
                  className="btn header-btn ms-4"
                  onClick={handleSaveClick}
                >
                  Save as
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
      <div className="Tasktable mt-3">
        <div className="container task-table">
          {taskFormVisible && (
            <div className="task-form">
              <h5>Add Task</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="taskId" className="form-label">
                    Task ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="taskId"
                    name="taskId"
                    value={newTask.taskId}
                    onChange={handleFormInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="taskName" className="form-label">
                    Task Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="taskName"
                    name="taskName"
                    value={newTask.taskName}
                    onChange={handleFormInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="assignedTo" className="form-label">
                    Assigned To
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="assignedTo"
                    name="assignedTo"
                    value={newTask.assignedTo}
                    onChange={handleFormInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="priority" className="form-label">
                    Priority
                  </label>
                  <select
                    className="form-select"
                    id="priority"
                    name="priority"
                    value={newTask.priority}
                    onChange={handleFormInputChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="dueDate" className="form-label">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={handleFormInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="completion" className="form-label">
                    Completion Status
                  </label>
                  <select
                    className="form-select"
                    id="completion"
                    name="completion"
                    value={newTask.completion}
                    onChange={handleFormInputChange}
                  >
                    <option value="Completed">Completed</option>
                    <option value="Issues">Issues</option>
                    <option value="Progress">Progress</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmitTask}
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          <div className="filter-container">
            <div className="mb-3">
              <label htmlFor="completionFilter" className="form-label">
                Filter by Completion Status
              </label>
              <select
                className="form-select"
                id="completionFilter"
                name="completionFilter"
                value={filter}
                onChange={handleFilterChange}
              >
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Issues">Issues</option>
                <option value="Progress">Progress</option>
              </select>
            </div>
          </div>

          <div className="table-container" id="table-to-export">
            <table className="table container table-striped">
              <thead>
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
                      <div className="task-info">{task.assignedTo}</div>
                    </td>
                    <td>{task.priority}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.completion}</td>
                    <td className="text-center"></td>
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
                length: Math.ceil(filteredTasks.length / tasksPerPage),
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
                  currentPage === Math.ceil(filteredTasks.length / tasksPerPage)
                    ? "disabled"
                    : ""
                }`}
                disabled={
                  currentPage === Math.ceil(filteredTasks.length / tasksPerPage)
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
