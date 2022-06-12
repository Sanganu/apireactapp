import React, { useState, useEffect } from "react";

const GetStudent = () => {
    const [studentData, setStudentData] = useState([])
    useEffect(() => {
        fetch('/graphql', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                query{
                    displaystudents{
                        id
                      name
                     tuition
                      department{
                          id
                          department_name
                        }
                     
                    }
                }`
            })
        }).then(res => res.json())
            .then(data => {
                console.log( "Get Studn",data)
                 setStudentData(data.data.displaystudents)

            }).catch(err => console.error(err))
    }, [])

    return (<main className="table-container">
        <table className="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Student Name</th>
                    <th>Tuition</th>
                    <th>Department</th>
                </tr>

            </thead>
            <tbody>

                {studentData.map((student, key) => <tr key={key}>
                    <th>{student.id}</th>
                    <th>{student.name}</th>
                    <th>{student.tuition}</th>
                    <th>{student.department.department_name}</th>
                </tr>)}
            </tbody>

        </table>
    </main>)
}


export default GetStudent;
