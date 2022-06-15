import React, { useState } from 'react';
import NavTabs from './NavTabs';
// import AddData from './AddData';
import Employees from './GetEmployee';
import Students from './GetStudent';
import Department from './Departments';
import GetCountry from "./GetCountry";

function Header() {
  // Using useState, set the default value for currentPage to 'Home'
  const [currentPage, handlePageChange] = useState('');

  // The renderPage method uses a switch statement to render the appropriate current page
  const renderPage = (current) => {
    switch (currentPage) {
      // case 'AddData':
      //   return <AddData />;
      case 'Employees':
        return <Employees />;
      case 'Students':
        return <Students />;
      case 'Department':
        return <Department />;
     case 'Country':
        return <GetCountry/>;
    default:
        return(<section className="hero is-link is-fullheight-with-navbar">
        <div className="hero-body">
          <p className="title">
         Full-stack app with RECT & GraphQL</p>
         
          <span className="is-size-7 px-2 ml-2">GraphQL Endpoints implemented with fetch</span>
          
        </div>
      </section>) 
    }
  };

  return (
    <div>
      <header className="has-background-primary has-text-white-bis">


       
        {/* Pass the state value and the setter as props to NavTabs */}
        <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      </header>

      {/* Call the renderPage function passing in the currentPage */}
      <main className="container">
      <div>{renderPage(currentPage)}</div>
      </main>
   



    </div>
  );
}

export default Header;
