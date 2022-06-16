import React, { useState, useEffect } from "react";

const GetDepartment = () => {
    const [DepartmentData, setDepartmentData] = useState([])
    useEffect(() => {
        fetch('/graphql', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                query{
                    displayDepartments{
                        id
                        department_name
                      students{
                          name
                          tuition
                          id
                        }
                      }
                }`
            })
        }).then(res => res.json())
            .then(data => {
                console.log( "Get tokow",data)
                 setDepartmentData(data.data.displayDepartments)

            }).catch(err => console.error(err))
    }, [])

    return (<main className="table-container">
    <article className="section has-background-warning-dark p-4 has-text-white-ter">
     <h6>GraphQL endpoint<span> - displayDepartments query</span></h6>
     </article>
        <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Department Name</th>
                    <th>Tuition Revenue</th>
                    <th>Number students</th>
                </tr>

            </thead>
            <tbody>

                {DepartmentData.map((Department, key) => <tr key={key}>
                    <td>{Department.id}</td>
                    <td>{Department.department_name}</td> 
                    {/* {Department.student.reduce((total,element) => (total+element.tuition) )} */}
                    <td></td>
                    <td>{Department.student}</td>
                </tr>)}
            </tbody>

        </table>
    </main>)
}


export default GetDepartment;
