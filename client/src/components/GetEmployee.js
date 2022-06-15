import React, { useState, useEffect } from "react";

const GetEmployee = () => {
    const [employeeData, setEmployeeData] = useState([])
    const [empDetails, setEmpDetails] = useState({
        JobTitle: "",
        EmailAddress: "",
        FirstNameLastName: ""
    })
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
                console.log(data.data.getEmployeesDB, "Get Employees", data)
                setEmployeeData(data.data.getEmployeesDB)

        }).catch(err => console.error(err))
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        // console.log([name],value)
        setEmpDetails({ ...empDetails, [name]: value })
    }

    const addEmployee = (event) => {
        event.preventDefault()
        console.log(empDetails)
        fetch('/graphql', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                    mutation{
                     addEmployee(JobTitle:"${empDetails.JobTitle}",EmailAddress:"${empDetails.EmailAddress}",FirstNameLastName:"${empDetails.FirstNameLastName}"){
                        JobTitle
                        EmailAddress
                        FirstNameLastName 
                        ID
                        }
                      }
                    `
            })
            }).then(res => res.json())
            .then(data => {
                console.log("PostEmployee", data)
                let newEmployeeData = { ...data.data.addEmployee }
                if(newEmployeeData){
                setEmployeeData([...employeeData, newEmployeeData])
                }


            }).catch(err => console.error(err))
    }

    return (<main className="table-container">

        <form className="container block">
            <h6 className="px-6">GraphQL Endpoint -Employee Data  <spam>query - getEmployeesDB / mutation - addEmployeee</spam></h6>
            <label>Employee Name</label>
            <input placeholder="Username" name="FirstNameLastName" value={empDetails.FirstNameLastName} onChange={handleInputChange} />

            <label>Email Adresss</label>
            <input placeholder="Tuition" name="EmailAddress" type="text" value={empDetails.EmailAddress} onChange={handleInputChange} />
            <label>JobTitle</label>
            <input onChange={handleInputChange} value={empDetails.JobTitle} name="JobTitle" placeholder="JobTitle" type="text"/>
            <button className="button is-primary"
                onClick={addEmployee}>Save Employee</button>
        </form>
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
                    <td>{emp.ID}</td>
                    <td>{emp.EmailAddress}</td>
                    <td>{emp.FirstNameLastName}</td>
                    <td>{emp.JobTitle}</td>
                </tr>)}
             </tbody>
         </table>
      </main>)
}    


export default GetEmployee;
