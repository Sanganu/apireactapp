import React, { useState, useEffect } from "react";

const GetEmployee = () => {
    const [employeeData, setEmployeeData] = useState([])
    useEffect(() => {
        fetch('/graphql', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                query{
                    getEmployeesDB{
                        ID
                        JobTitle
                        EmailAddress
                        FirstNameLastName
                      }
                }`
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data.data.getEmployeesDB, "Get Employees",data)
                setEmployeeData(data.data.getEmployeesDB)

            }).catch(err => console.error(err))
    }, [])

    return (<main className="table-container">
       <h6>GraphQL Endpoint -Employee Data  <spam>query - getEmployeesDB</spam></h6>
      
        <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>EmailAddress</th>
                    <th>FirstNameLastName</th>
                    <th>JobTitle</th>
                </tr>

            </thead>
            <tbody>

                {employeeData.map((emp, key) => <tr key={key}>
                    <th>{emp.ID}</th>
                    <th>{emp.EmailAddress}</th>
                    <th>{emp.FirstNameLastName}</th>
                    <th>{emp.JobTitle}</th>

                </tr>)}
            </tbody>

        </table>
    </main>)
}


export default GetEmployee;
