import React from 'react';

// Props are passed through our functional component.
function NavTabs(props) {

  return (
    <nav className="navbar">
      <div className="container">
        <div id="navMenu" className="navbar-menu">
          <div className="navbar-start">
            <div className="navbar-item">
              <div className="buttons">
                <a className={
                  props.currentPage === "Home" ? 'navbar-item active' : 'navbar-item'}
                  href={'/'} onClick={() => props.handlePageChange("Home")}>
                  Home
                 </a>
                <a className={
                  props.currentPage === "Country" ? 'navbar-item active' : 'navbar-item'}
                  href={'#country'} onClick={() => props.handlePageChange("Country")}>
                  Country
                </a>
                <a className={
                  props.currentPage === "Employees" ? 'navbar-item active' : 'navbar-item'}
                  href={'#employees'} onClick={() => props.handlePageChange("Employees")}>
                  Employee
                 </a>

                <a className={
                  props.currentPage === "Students" ? 'navbar-item active' : 'navbar-item'}
                  href={'#students'} onClick={() => props.handlePageChange("Students")}>Students</a>
                {/* <a className={
              props.currentPage === "AddData" ? 'navbar-item active' : 'navbar-item'            }  
              href={'#adddata'}   onClick={() => props.handlePageChange("AddData")}>Add Data</a> */}
                <a className={
                  props.currentPage === "Department" ? 'navbar-item active' : 'navbar-item'}
                  href={'#department'} onClick={() => props.handlePageChange("Department")}>Departments</a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {/* <a href="http://localhost:8080/graphql" rel="noopener noreferrer" target="_blank">GrapQL Playgound</a> */}
                {/* <a className={
              props.currentPage === "AddData" ? 'navbar-item active' : 'navbar-item'            }  
              href={'#adddata'}   onClick={() => props.handlePageChange("AddData")}>Add Data</a> */}
                {/* <a className={
              props.currentPage === "Department" ? 'navbar-item active' : 'navbar-item'            }  
              href={'#department'}   onClick={() => props.handlePageChange("Department")}>Departments</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

  );
}

export default NavTabs;
