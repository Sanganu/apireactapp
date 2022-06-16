import React, { useState, useEffect } from "react";


const GetStudent = () => {
    const [studentData, setStudentData] = useState([])
    const [form, setForm] = useState({ name: "", tuition: "", department: "1" })
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
                console.log("Get Studn", data)
                setStudentData(data.data.displaystudents)

        }).catch(err => console.error(err))
    }, [])

    const handleInputChange = (event) => {
       const {name,value} = event.target
        // console.log([name],value)
        setForm({ ...form, [name]: value })
    }


    const addStudent = (event)=>{
        event.preventDefault()
        console.log(form)
        fetch('/graphql', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               query:`
                mutation{
                    addStudent(name:"${form.name}",tuition:${form.tuition},department:${form.department}){
                      id
                      name
                      tuition
                      department{
                        id
                        department_name
                      }
                    }
                  }
                `
            })
        }).then(res => res.json())
        .then(data => {
                console.log("POST Studn", data)
                let addedstudent = {...data.data.addstudent}
                setStudentData([...studentData,addedstudent])
              

        }).catch(err => console.error(err))
    }

    return (<main className="table-container">
    <form className="section has-background-link-dark p-5 has-text-white-ter ">
    <h6 className="m-3 p-3">GraphQL Endpoint -Student Data  <spam>query - displaystudents /mutation - addstudent</spam></h6>
            <label>Name</label>
             <input className="m-3 p-3" placeholder="Username" name="name" value={form.name} onChange={handleInputChange} />
       
            <label>Tuition</label>
            <input className="m-3 p-3" placeholder="Tuition" name="tuition" type="number" value={form.tuition} onChange={handleInputChange} />
            <label>
                Select Department
             </label>
                <select className="m-3 p-3"
                    onChange={handleInputChange}
                    value={form.department}
                    name="department">
                    <option value="1">
                        Math</option>

                    <option value="2">
                        Science
                    </option>
                    <option value="3">
                       Psychology
                    </option>
                    <option value="4">
                       Engineering
                    </option>
                </select>
      
            <button className="button is-primary m-3 p-3"
                onClick={addStudent}>Save student details</button>
      
        </form>
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
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.tuition}</td>
                    <td>{student.department.department_name}</td>
                </tr>)}
            </tbody>

        </table>
    </main>)
}


export default GetStudent;
