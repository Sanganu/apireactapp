import React, { useState,useEffect } from "react";
import { Form, Button } from "react-bulma-components";

const AddData = () => {
    const [form, setForm] = useState({
        name: "",
        tuition: "",
        department: ""
    });
    const [departments,setDepartments]=useState[{}]
    const handleInputChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setForm({...form,[name]:value})
    }
    // useEffect(()=>{
    //     fetch("",
    // {

    // }).then(data => data.json())
    // .then(departments => {
    //     console.log(deparmtent)
    //     setDepartments(department)
    // })

   // },[])
    return (<>
        <Form.Field>
            <Form.Label>Name</Form.Label>
            <Form.Control>
                <Form.Input placeholder="Username" name="name" value={form.name} onChange={handleInputChange} />
           
            </Form.Control>
        </Form.Field>
        <Form.Field>
            <Form.Label>Tuition</Form.Label>
            <Form.Control>
                <Form.Input placeholder="tuition" name="tuition" type="password" value={form.tuition} onChange={handleInputChange} />
             
            </Form.Control>
        </Form.Field>
        <Form.Field>
            <Form.Label>
                Select Deparmtent
             </Form.Label>
            <Form.Control>
                <Form.Select
                    onChange={function noRefCheck() { }}
                    value="option1"
                >
                    <Form.option value="1">
                        Math</Form.option>

                    <Form.option value="2">
                        Science
                    </Form.option>
                </Form.Select>
            </Form.Control>
        </Form.Field>
        <Button.Group>
            <Button fullwidth rounded color="primary" onClick={() => console.log(form)}>Save Student Details</Button>
        </Button.Group>
    </>)
}

export default AddData;
