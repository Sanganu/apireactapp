
const express = require("express")
const PORT = process.env.PORT || 8080;
const app = express()
const fs = require("fs")

const graphql = require("graphql")
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList,GraphQLNonNull } = require("graphql")
const { graphqlHTTP } = require("express-graphql")


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

let db = [].concat(JSON.parse(fs.readFileSync("./data/employeeDB.json")));

const EmployeeType = new GraphQLObjectType({
    name:'Employee',
    description: 'Employee JSON data type',
    fields:() =>({
    id: { type: GraphQLNonNull(GraphQLInt) },
    JobTitle: { type: GraphQLNonNull(GraphQLString) },
    EmailAddress: { type: GraphQLString },
    FirstNameLastName: { type: GraphQLString }
    })
})

const  RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query Type",
    fields: () => ({
       getEmployeesDB:{
           type:new GraphQLList(EmployeeType),
           description: "Get All records",
           resolve:() => db
       }
    })
})


// const Mutation = new GraphQLObjectType({
//     name: "Mutation",
//     fields: {
//         createUser: {
//             type: EmployeeType,
//             args: {
//                 JobTitle: { type: GraphQLString },
//                 EmailAddress: { type: GraphQLString },
//                 FirstNameLastName: { type: GraphQLString }
//             },
//             resolve(parent, args) {
//                 console.log(...args)
//                 db.push({ ID: db.length + 1, ...args })
//                 return args
//             }
//         }
//     }
// });

//How Graphql knows how our actual data looks like
const schema = new GraphQLSchema({
    query: RootQueryType
   
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





