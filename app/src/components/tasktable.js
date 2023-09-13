import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

import "../Styles/tasktable.css";
import Sidebar from "../components/sidebar";
import { FcNext, FcPrevious } from "react-icons/fc";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";

function Tasktable() {
  const [taskFormVisible, setTaskFormVisible] = useState(false);
  const [newTask, setNewTask] = useState({
    taskId: "",
    taskName: "",
    assignedTo: "",
    priority: "Low",
    dueDate: "",
    completion: 0,
  });

  const [tasks, setTasks] = useState([]);

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
          completion: 0,
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

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const titleText = "Cutover Automation Tool";
    const headerX = 10;
    const startY = 40; // Initial y-position for table headers
    const lineHeight = 10; // Line height for each row
    const itemsPerPage = 30; // Number of items to display per page

    pdf.setTextColor(255, 0, 0);
    pdf.setFontSize(24); // Increase title font size
    const titleWidth =
      (pdf.getStringUnitWidth(titleText) * pdf.internal.getFontSize()) /
      pdf.internal.scaleFactor;
    const titleX = (pdfWidth - titleWidth) / 2;
    const titleY = 20;
    pdf.text(titleText, titleX, titleY, { align: "center" });

    pdf.setTextColor(0, 0, 0);

    // Function to add date, time, and page number
    function addPageContent(pageNum) {
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      const content = `Date: ${currentDate} | Time: ${currentTime} | Page: ${pageNum}`;
      pdf.text(content, pdfWidth / 2, pageHeight - 10, { align: "center" });
    }

    let currentPage = 1;
    let dataIndex = 0;

    while (dataIndex < currentTasks.length) {
      if (currentPage > 1) {
        pdf.addPage();
      }

      // Set font size and style for table headings
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12); // Reduce font size for headings

      // Add table headers
      pdf.text("Task ID", headerX, startY);
      pdf.text("Task Name", headerX + 50, startY);
      pdf.text("Assigned To", headerX + 100, startY);
      pdf.text("Priority", headerX + 150, startY);
      pdf.text("Due Date", headerX + 200, startY);
      pdf.text("Completion", headerX + 250, startY);

      // Reset font size for data
      pdf.setFontSize(10);

      // Add table data for the current page
      for (let i = 0; i < itemsPerPage; i++) {
        if (dataIndex >= currentTasks.length) {
          break;
        }
        const task = currentTasks[dataIndex];
        const y = startY + (i + 1) * lineHeight;

        // Make sure to align the text properly
        pdf.text(`${task.taskId}`, headerX, y, { align: "left" });
        pdf.text(`${task.taskName}`, headerX + 50, y, { align: "left" });
        pdf.text(`${task.assignedTo}`, headerX + 100, y, { align: "left" });
        pdf.text(`${task.priority}`, headerX + 150, y, { align: "left" });
        pdf.text(`${task.dueDate}`, headerX + 200, y, { align: "left" });
        pdf.text(`${task.completion}%`, headerX + 250, y, { align: "left" });
        dataIndex++;
      }

      // Add page number and move to the next page
      addPageContent(currentPage);
      currentPage++;
    }

    pdf.save("document.pdf");
  }
  //----------------- 2 pdf ----------------------
  // async function downloadPDF() {
  //   const input = document.getElementById("table-to-export");
  //   if (!input) {
  //     console.error("Element with id 'table-to-export' not found.");
  //     return;
  //   }

  //   // Create a canvas from the HTML element
  //   const canvas = await html2canvas(input);
  //   const imgData = canvas.toDataURL("image/png");

  //   // Initialize a PDF document
  //   const pdf = new jsPDF("p", "mm", "a4");
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = pdf.internal.pageSize.getHeight();

  //   // Add a title at the top with red color
  //   const titleText = "Cutover Automation Tool";
  //   pdf.setTextColor(255, 0, 0); // Set text color to red
  //   pdf.setFontSize(20); // Adjust font size as needed
  //   const titleWidth =
  //     (pdf.getStringUnitWidth(titleText) * pdf.internal.getFontSize()) /
  //     pdf.internal.scaleFactor;
  //   const titleX = (pdfWidth - titleWidth) / 2;
  //   const titleY = 20;
  //   pdf.text(titleText, titleX, titleY, { align: "center" });

  //   // Reset text color to black for subsequent text
  //   pdf.setTextColor(0, 0, 0);

  //   // Calculate the dimensions for the table
  //   const imgProps = pdf.getImageProperties(imgData);
  //   const tableWidth = pdfWidth - 20; // Adjust as needed
  //   const tableHeight = (imgProps.height * tableWidth) / imgProps.width;

  //   // Add the table image in the middle

  //   pdf.addImage(imgData, "PNG", 10, 30, tableWidth, tableHeight);

  //   pdf.setFontSize(12);
  //   const pageNumberText = `Page ${pdf.internal.getNumberOfPages()}`;
  //   const pageNumberWidth =
  //     (pdf.getStringUnitWidth(pageNumberText) * pdf.internal.getFontSize()) /
  //     pdf.internal.scaleFactor;
  //   pdf.text(pageNumberText, pdfWidth - pageNumberWidth - 10, pdfHeight - 10);

  //   // Reset text color to black for subsequent text
  //   pdf.setTextColor(0, 0, 0);
  //   const date = new Date();
  //   const dateString = date.toLocaleDateString();
  //   const timeString = date.toLocaleTimeString();
  //   pdf.text(`Date: ${dateString}`, 10, pdfHeight - 20);
  //   pdf.text(`Time: ${timeString}`, 10, pdfHeight - 10);

  //   // Reset text color to black for subsequent text
  //   pdf.setTextColor(0, 0, 0);

  //   // Save the PDF
  //   pdf.save("document.pdf");
  // }

  const [sliderValue, setSliderValue] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

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
                DownloadPDF
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
                    Completion
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    id="completion"
                    name="completion"
                    min="0"
                    max="100"
                    value={newTask.completion}
                    onChange={handleFormInputChange}
                  />
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
