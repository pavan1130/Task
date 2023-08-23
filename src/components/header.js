import "./header.css";

function Header() {
    return (
        <div className="Header">
            <div className="container header-container">
                <div className="row">
                    <div className="col-4">
                        <h4>Task List</h4>
                    </div>
                    <div className="col-8 d-flex justify-content-end">
                        <button type="button" className="btn header-btn ms-4">Add Task</button>
                        <button type="button" className="btn header-btn ms-4">Upload</button>
                        <button type="button" className="btn header-btn ms-4">Download</button>
                        <button type="button" className="btn header-btn ms-4">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
