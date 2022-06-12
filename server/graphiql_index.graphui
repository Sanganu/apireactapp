// The following is the Syntax for using graphiui 
//Query & Mutation (index.js)
`query{
  
    displayEmployees{
        id
      name
      salary
      department{
          id
          department_name
        }
     
    }
  
  
    displayDepartments{
      id
      department_name
      employees{
        name
        salary
        id
      }
    }
    
    getEmployee(id:7){
      id
      name
      salary
      department{
        id
        department_name
      }
    }
    
    getDepartment(id:3){
      id
      department_name
      employees{
        name
        salary
        id
      }
    }
    
  }





//   Mutation


mutation{
    addEmployee(name:"check emp",salary:32948,departmentId:1){
        id
        salary
        name
        departmentId
      }
      addDepartment(department_name:"Testers"){
        id
        department_name
      }
    }`