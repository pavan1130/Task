import React, { useEffect, useState } from 'react';
import Header from './header';
import "./tasktable.css";

function Tasktable() {
    const [sliderValue, setSliderValue] = useState(30);

    useEffect(() => {
        const progress = document.querySelector('.progress');

        progress.addEventListener('input', function () {
            const value = this.value;
            setSliderValue(value);
            this.style.background = `linear-gradient(to right, #23cb34 0%, #23cb34 ${value}%, #c2e7c5 ${value}%, #c2e7c5 100%)`;
        });
    }, []);
    return (
        <div>
            <Header />

            <div className="Tasktable mt-3">

                <div class="container  task-table">
                    <div className='table-container'>
                        <table class="table container  table-striped">
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
                                    <th className="table-sub-hd" scope="col">Task ID</th>
                                    <th className="table-sub-hd" scope="col">Task Name(WBS)</th>
                                    <th className="table-sub-hd" scope="col">Assigned To</th>
                                    <th className="table-sub-hd" scope="col">Priority</th>
                                    <th className="table-sub-hd" scope="col">Due Date</th>
                                    <th className="table-sub-hd" scope="col">Completion</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2459</td>
                                    <td>Data Migration</td>
                                    <td> <img className='emp-img' src='vila.jpg' alt='not found'></img> Shilpa Joshi</td>
                                    <td><button type="button" class="btn high btn-outline-danger">High</button></td>
                                    <td>21/08/2023</td>
                                    <td className="text-center">
                                        <div className="slider-container">
                                            <input type="range" value={sliderValue} min="0" max="100" step="1" className="progress" />
                                            <span>{sliderValue}%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2459</td>
                                    <td>Exract Data</td>
                                    <td> <img className='emp-img' src='vila.jpg' alt='not found'></img> Serenity</td>
                                    <td><button type="button" class="btn high btn-outline-danger">High</button></td>
                                    <td>21/08/2023</td>
                                    <td className="text-center">
                                        <div className="slider-container">
                                            <input type="range" value={sliderValue} min="0" max="100" step="1" className="progress" />
                                            <span>{sliderValue}%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2459</td>
                                    <td>Load Data to Target</td>
                                    <td> <img className='emp-img' src='vila.jpg' alt='not found'></img> Savannah</td>
                                    <td><button type="button" class="btn medium btn-outline-warning">Medium</button></td>
                                    <td>23/08/2023</td>
                                    <td className="text-center">
                                        <div className="slider-container">
                                            <input type="range" value={sliderValue} min="0" max="100" step="1" className="progress" />
                                            <span>{sliderValue}%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2459</td>
                                    <td>Load Data to Target</td>
                                    <td> <img className='emp-img' src='vila.jpg' alt='not found'></img> Savannah</td>
                                    <td><button type="button" class="btn medium btn-outline-warning">Medium</button></td>
                                    <td>23/08/2023</td>
                                    <td className="text-center">
                                        <div className="slider-container">
                                            <input type="range" value={sliderValue} min="0" max="100" step="1" className="progress" />
                                            <span>{sliderValue}%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2459</td>
                                    <td>Load Data to Target</td>
                                    <td> <img className='emp-img' src='vila.jpg' alt='not found'></img> Savannah</td>
                                    <td><button type="button" class="btn medium btn-outline-warning">Medium</button></td>
                                    <td>23/08/2023</td>
                                    <td className="text-center">
                                        <div className="slider-container">
                                            <input type="range" value={sliderValue} min="0" max="100" step="1" className="progress" />
                                            <span>{sliderValue}%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2459</td>
                                    <td>Load Data to Target</td>
                                    <td> <img className='emp-img' src='vila.jpg' alt='not found'></img> Savannah</td>
                                    <td><button type="button" class="btn medium btn-outline-warning">Medium</button></td>
                                    <td>23/08/2023</td>
                                    <td className="text-center">
                                        <div className="slider-container">
                                            <input type="range" value={sliderValue} min="0" max="100" step="1" className="progress" />
                                            <span>{sliderValue}%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2459</td>
                                    <td>Load Data to Target</td>
                                    <td> <img className='emp-img' src='vila.jpg' alt='not found'></img> Savannah</td>
                                    <td><button type="button" class="btn medium btn-outline-warning">Medium</button></td>
                                    <td>23/08/2023</td>
                                    <td className="text-center">
                                        <div className="slider-container">
                                            <input type="range" value={sliderValue} min="0" max="100" step="1" className="progress" />
                                            <span>{sliderValue}%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2459</td>
                                    <td>Project Closure</td>
                                    <td> <img className='emp-img' src='vila.jpg' alt='not found'></img> Priscilla</td>
                                    <td><button type="button" class="btn low btn-outline-success">Low</button></td>
                                    <td>31/08/2023</td>
                                    <td className="text-center">
                                        <div className="slider-container">
                                            <input type="range" value={sliderValue} min="0" max="100" step="1" className="progress" />
                                            <span>{sliderValue}%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2459</td>
                                    <td>Project Closure</td>
                                    <td> <img className='emp-img' src='vila.jpg' alt='not found'></img> Priscilla</td>
                                    <td><button type="button" class="btn low btn-outline-success">Low</button></td>
                                    <td>31/08/2023</td>
                                    <td className="text-center">
                                        <div className="slider-container">
                                            <input type="range" value={sliderValue} min="0" max="100" step="1" className="progress" />
                                            <span>{sliderValue}%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2459</td>
                                    <td>Project Closure</td>
                                    <td> <img className='emp-img' src='vila.jpg' alt='not found'></img> Priscilla</td>
                                    <td><button type="button" class="btn low btn-outline-success">Low</button></td>
                                    <td>31/08/2023</td>
                                    <td className="text-center">
                                        <div className="slider-container">
                                            <input type="range" value={sliderValue} min="0" max="100" step="1" className="progress" />
                                            <span>{sliderValue}%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2459</td>
                                    <td>Project Closure</td>
                                    <td> <img className='emp-img' src='vila.jpg' alt='not found'></img> Priscilla</td>
                                    <td><button type="button" class="btn low btn-outline-success">Low</button></td>
                                    <td>31/08/2023</td>
                                    <td className="text-center">
                                        <div className="slider-container">
                                            <input type="range" value={sliderValue} min="0" max="100" step="1" className="progress" />
                                            <span>{sliderValue}%</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2459</td>
                                    <td>Project Closure</td>
                                    <td> <img className='emp-img' src='vila.jpg' alt='not found'></img> Priscilla</td>
                                    <td><button type="button" class="btn low btn-outline-success">Low</button></td>
                                    <td>31/08/2023</td>
                                    <td className="text-center">
                                        <div className="slider-container">
                                            <input type="range" value={sliderValue} min="0" max="100" step="1" className="progress" />
                                            <span>{sliderValue}%</span>
                                        </div>
                                    </td>
                                </tr>


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default Tasktable;