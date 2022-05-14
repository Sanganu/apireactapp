
const express = require("express")
const PORT = process.env.PORT || 8000;
const app = express()
const fs = require("fs")

const graphql = require("graphql")
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList,GraphQLNonNull } = require("graphql")
const { graphqlHTTP } = require("express-graphql")


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

let db = require("./data/employeeDB.json")

// console.log(db)
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

const  RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query to get data from db",
    fields: () => ({
       getEmployeesDB:{
           type:new GraphQLList(EmployeeType),
           description: "Get All employee records from db.json",
           resolve:() => db
       }
    })
})


const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    description:"Create Update Delete operations",
    fields:() =>({
        createUser: {
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
                return newUser
            }
        }
    })
});

//How Graphql knows how our actual data looks like
const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutation
   
})
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
})) //Graphiql - GUI interface for Graphql queries and mutation setting to false will not enable the GUI



// Start DB and then start app server.

app.listen(PORT, () => {
    console.log(`Server listening on PORT http://localhost:${PORT}`);
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
})





