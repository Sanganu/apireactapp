const express = require("express")
const PORT = process.env.PORT || 8080;
const app = express();
const path = require("path")

const graphql = require("graphql")
const { GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLInt,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLList } = require("graphql")
const { graphqlHTTP } = require("express-graphql")

const {RootMutationType,RootQueryValue}=require("./schema/typesMutationQuery");

const schema = new GraphQLSchema({
    query: RootQueryValue,
    mutation:RootMutationType
})
app.use("/graphql",graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT,()=>{
    console.log(`Graphql and express basic setup http://localhost:${PORT}/graphql`)
})