const Employee = require('../models/employeeModel');
const resolvers = {
Mutation: {
        //add an employee
        addEmployee: async (_, args) => {
          try {
            const employee = new Employee(args);
            await employee.save();
            return employee;
          } catch (error) {
            throw new Error(error);
          }
        },
        //update an employee
        updateEmployee: async (_, { _id, ...args }) => {
          try {
            const updatedEmployee = await Employee.findByIdAndUpdate(_id, args, { new: true });
            return updatedEmployee;
          } catch (error) {
            throw new Error(error);
          }
        },
        //delete employee
        deleteEmployeeById: async (_, { _id }) => {
          try {
            const deletedEmployee = await Employee.findByIdAndDelete(_id);
            return deletedEmployee;
          } catch (error) {
            throw new Error(error);
          }
        }
  },
  Query: {
    //get all employees
    getAllEmployees: async () => {
      try {
        const employees = await Employee.find();
        return employees;
      } catch (error) {
        throw new Error(error);
      }
    },
    //find by id
    getEmployeeById: async (_, { _id }) => {
      try {
        const employee = await Employee.findById(_id);
        return employee;
      } catch (error) {
        throw new Error(error);
      }
    }
  },
};

module.exports = resolvers;
