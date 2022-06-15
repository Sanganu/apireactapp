const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList,GraphQLNonNull,GraphQLFloat } = require("graphql")
let db = require("../data/employeeDB.json")
let departmentValues = require("../data/departmentsDB.json")
let studentValues = require("../data/studentsDB.json")
const fs = require("fs");

const EmployeeType = new GraphQLObjectType({
    name:'Employee',
    description: 'Employee JSON data type',
    fields:() =>({
    ID: { type: GraphQLNonNull(GraphQLInt) },
    JobTitle: { type: GraphQLNonNull(GraphQLString) },
    EmailAddress: { type:GraphQLNonNull(GraphQLString) },
    FirstNameLastName: { type: GraphQLNonNull(GraphQLString) }
    })
})

const DepartmentType = new GraphQLObjectType({
    name: 'Department',
    description: 'Department array of JSON ',
    fields: () => ({
        id:{type: GraphQLNonNull(GraphQLInt)},
        department_name:{type: GraphQLNonNull(GraphQLString)},
        students:{
            type: new GraphQLList(StudentType),
            resolve: (department)=> studentValues.filter(s => s.department === department.id)
        }
    })
})

const StudentType = new GraphQLObjectType({
    name: 'student',
    description: "student JSON object",
    fields: () => ({
        id:{type: GraphQLNonNull(GraphQLInt)},
        name:{type: GraphQLNonNull(GraphQLString)},
        tuition :{type:GraphQLFloat},
        department:{
            type:DepartmentType,
            resolve: (student) => { //student - is the parent. where we need to use the Id from the parent and find the department details
                return departmentValues.find(department => department.id === student.department)

            }
        }
    })
})

const RootQueryValue = new GraphQLObjectType({
    name: "Query",
    description: "student data and Department data display",
    fields:() => ({ // Here the fields is like a function if you change to fields: { } like a variable - then it will throw error - Booktype needs Author type - Author type needs Book type andhence it will give undefined for that reason we have it as function
        //Query - FindAll        
       displaystudents:{
           type: new GraphQLList(StudentType),
           description:"Get all student data",
           resolve: () => studentValues
       },
       displayDepartments:{
           type: new GraphQLList(DepartmentType),
           description:"Get all departments",
           resolve: ()=>departmentValues
       },
       //Query - Find by parameter
       getstudent:{
            type: StudentType,
            description:"Get specific student data",
            args:{
                id:{type:GraphQLInt}
            },
            resolve: (parent,args) => studentValues.find(s => s.id === args.id)
       },
       getDepartment:{
            type: DepartmentType,
            description:"Get specific department value",
            args:{
                id:{type:GraphQLInt}
            },
            resolve: (parent,args)=>{
                let deptRecord =  departmentValues.find(d => d.id === args.id)
                let studentRecords = studentValues.find(s => s.department === args.id)
                deptRecord.students = studentRecords
                console.log(deptRecord,studentRecords)
                return deptRecord;
            }
       },
       getEmployeesDB:{
            type:new GraphQLList(EmployeeType),
            description: "Get All employee records from db.json",
            resolve:() => db
      }
    })
})

const RootMutationType = new GraphQLObjectType({
    name:'Mutation',
    description: 'Root Mutation',
    fields: () =>({
        addstudent:{
            type: StudentType,
            description: "Add new student",
            args: { //When passing args of string type should use "" not single because just like json '' is invalid
                
                name:{type: GraphQLNonNull(GraphQLString)},
                tuition :{type:GraphQLFloat},
                department:{type:GraphQLNonNull(GraphQLInt)},
                    
            },
            resolve:(parent,args) => {
                const newstudent= {id:Math.floor(Math.random()*121)+1,name:args.name,
                    tuition :args.tuition ,department:args.department}
                    console.log(newstudent,"NE")
                studentValues.push(newstudent)
          
                return newstudent
            }
        },
        addDepartment:{
            type:DepartmentType,
            description:"Add new department",
            args:{
             department_name:{type: GraphQLNonNull(GraphQLString)}   
            },
            resolve:(parent,args) => {
                const newDepartment = {id:departmentValues.length+1,department_name:args.department_name}
                departmentValues.push(newDepartment)
                         return newDepartment;
            }
        },
        addEmployee: {
            type: EmployeeType,
            description:"Create a new User",
            args: {
                JobTitle: { type: GraphQLString },
                EmailAddress: { type: GraphQLString },
                FirstNameLastName: { type: GraphQLString }
            },
            resolve:(parent, args) =>{
                
                const newUser = { ID: db.length + 1, 
                    JobTitle:args.JobTitle,
                 EmailAddress:args.EmailAddress,
                FirstNameLastName:args.FirstNameLastName }
                db.push(newUser)
              
                return newUser;
            }
        }
    })
})

module.exports = { RootMutationType,RootQueryValue}