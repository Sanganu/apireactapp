const express= require("express")
const { ApolloServer, gql } = require('apollo-server-express');
const PORT = process.env.PORT || 8080;
const app = express()
const db = require("./connection")

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
app.use(require("./routes"))



// Apollo-Grapql
async function startApolloServer() {
    // Construct a schema, using GraphQL schema language
    
}    

// Start Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
 server.start();
server.applyMiddleware({ app });


// production env setup
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Start DB and then start app server.
db.once("open",() => {
    app.listen(PORT,() => {
        console.log(`Server listening on PORT http://localhost:${PORT}`);
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    })
});




