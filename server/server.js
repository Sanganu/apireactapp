const express= require("express")
const { ApolloServer, gql } = require('apollo-server-express');
const PORT = process.env.PORT || 8080;
const app = express()
const dbORM = require("./connection")

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
app.use(require("./routes"))

// production env setup
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }


// Apollo-Grapql
async function startApolloServer() {
    // Construct a schema, using GraphQL schema language
    const typeDefs = gql`
      type Query {
        hello: String
      }
    `;
  
    // Provide resolver functions for your schema fields
    const resolvers = {
      Query: {
        hello: () => 'Hello world!',
      },
    };
}    

// Start Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
server.applyMiddleware({ app });


// Start DB and then start app server.
dbORM.once("open",() => {
    app.listen(PORT,() => {
        console.log(`Server listening on PORT http://localhost:${PORT}`);
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    })
});




