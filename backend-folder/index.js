const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const typeDefs = require('./backend/schema/schema');
const userResolver = require('./backend/resolvers/userResolver');
const employeeResolver = require('./backend/resolvers/employeeResolver');
const { GraphQLString, GraphQLNonNull } = require('graphql');
const { EmployeeType } = require('./backend/employeeTypes'); 
const { UserType } = require('./backend/userTypes'); 
const Employee = require('./backend/models/employeeModel'); 
const bcrypt = require('bcrypt');
const app = express();
//mongoose
mongoose
  .connect('mongodb://127.0.0.1:27017/101369909_assignment1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 4000,
    socketTimeoutMS: 40000 
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(error));
const addEmployeeResolver = async (parent, args) => {
  try {
    const newEmployee = new Employee(args);
    return await newEmployee.save();
  } catch (error) {
    console.error("Error adding new employee:", error);
    throw error; 
  }
};
//Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers: [userResolver, employeeResolver, addEmployeeResolver] 
});
async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}
startApolloServer();
//Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
