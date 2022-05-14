const express = require("express")
const PORT = process.env.PORT || 8080;
const app = express()

const graphql = require("graphql")
const { GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLList } = require("graphql")
const { graphqlHTTP } = require("express-graphql")


const employeeValues = [
    {
        id:1,
        name:"Tom",
        salary:122495,
        departmentId:1,
    },
    {
        id:2,
        name:"Bomy",
        salary:812324,
        departmentId:3,
    },
    {
        id:3,
        name:"Som",
        salary:52324,
        departmentId:2,
    },
    {
        id:4,
        name:"Aom",
        salary:12394,
        departmentId:4,
    },
    {
        id:5,
        name:"Uom",
        salary:12224,
        departmentId:2,
    },
    {
        id:6,
        name:"Pom",
        salary:91224,
        departmentId:1,
    },
    {
        id:7,
        name:"Lim",
        salary:812324,
        departmentId:3,
    },
    {
        id:9,
        name:"Pomp",
        salary:82324,
        departmentId:2,
    },
    {
        id:10,
        name:"Fooom",
        salary:52394,
        departmentId:4,
    },
    {
        id:5,
        name:"Rpom",
        salary:42224,
        departmentId:2,
    }
]

const departmentValues = [
    {
        id: 1,
        department_name:"Marketing"
    },
    {
        id: 2,
        department_name:"Sales"
    },
    {
        id: 3,
        department_name:"Production"
    },
    {
        id: 4,
        department_name:"Technology"
    }
]

const DepartmentType = new GraphQLObjectType({
    name: 'Department',
    description: 'Department array of JSON ',
    fields: () => ({
        id:{type: GraphQLNonNull(GraphQLInt)},
        department_name:{type: GraphQLNonNull(GraphQLString)},
        employees:{
            type: new GraphQLList(EmployeeType),
            resolve: (depart)=> employeeValues.filter(e => e.departmentId === depart.id)
        }
    })
})

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    description: "Employee JSON object",
    fields: () => ({
        id:{type: GraphQLNonNull(GraphQLInt)},
        name:{type: GraphQLNonNull(GraphQLString)},
        salary:{type:GraphQLFloat},
        departmentId:{type:GraphQLNonNull(GraphQLInt)},
        department:{
            type:DepartmentType,
            resolve: (Employee) => { //Employee - is the parent. where we need to use the Id from the parent and find the department details
                return departmentValues.find(department => department.id === Employee.departmentId)

            }
        }
    })
})

const RootMutationType = new GraphQLObjectType({
    name:'Mutation',
    description: 'Root Mutation',
    fields: () =>({
        addEmployee:{
            type: EmployeeType,
            description: "Add new Employee",
            args: { //When passing args of string type should use "" not single because just like json '' is invalid
                
                name:{type: GraphQLNonNull(GraphQLString)},
                salary:{type:GraphQLFloat},
                departmentId:{type:GraphQLNonNull(GraphQLInt)},
                    
            },
            resolve:(parent,args) => {
                const newEmployee= {id:employeeValues.length+1,name:args.name,
                    salary:args.salary,departmentId:args.departmentId}
                    console.log(newEmployee,"NE")
                employeeValues.push(newEmployee)
                return newEmployee
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
                return newDepartment
            }
        }
    })
})
const RootQueryValue = new GraphQLObjectType({
    name: "Query",
    description: "Employee data and Department data display",
    fields:() => ({ // Here the fields is like a function if you change to fields: { } like a variable - then it will throw error - Booktype needs Author type - Author type needs Book type andhence it will give undefined for that reason we have it as function
        //Query - FindAll        
       displayEmployees:{
           type: new GraphQLList(EmployeeType),
           description:"Get all employee data",
           resolve: () => employeeValues
       },
       displayDepartments:{
           type: new GraphQLList(DepartmentType),
           description:"Get all departments",
           resolve: ()=>departmentValues
       },
       //Query - Find by parameter
       getEmployee:{
        type: EmployeeType,
        description:"Get specific employee data",
        args:{
            id:{type:GraphQLInt}
        },
        resolve: (parent,args) => employeeValues.find(e => e.id === args.id)
       },
       getDepartment:{
        type: DepartmentType,
        description:"Get specific department value",
        args:{
            id:{type:GraphQLInt}
        },
        resolve: (parent,args)=>departmentValues.find(e => e.id === args.id)
       }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryValue,
    mutation:RootMutationType
})
app.use("/graphql",graphqlHTTP({
    schema: schema,
    graphiql: true
}));



app.listen(PORT,()=>{
    console.log(`Graphql and express basic setup http://localhost:${PORT}/graphql`)
})