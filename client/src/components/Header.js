import React, { useState } from 'react';
import NavTabs from './NavTabs';
import AddData from './pages/AddData';
import Employees from './pages/Employees';
import Students from './pages/Students';
import Departments from './pages/Departments';

function Header() {
  // Using useState, set the default value for currentPage to 'Home'
  const [currentPage, handlePageChange] = useState('Home');

  // The renderPage method uses a switch statement to render the appropriate current page
  const renderPage = () => {
    switch (currentPage) {
      case 'AddData':
        return <AddData />;
      case 'Employees':
        return <Employees />;
      case 'Contact':
        return <Students />;
      case 'Department':
        return <Department />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      {/* Pass the state value and the setter as props to NavTabs */}
      <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      {/* Call the renderPage function passing in the currentPage */}
      <div>{renderPage(currentPage)}</div>
    </div>
  );
}

export default Header;
