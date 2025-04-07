const { GraphQLError } = require("graphql");
const Employee = require("../models/Employee");

const employeeResolvers = {
  Query: {
    getAllEmployees: async (_, __, { user }) => {
      if (!user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "Unauthorized" },
        });
      }
      try {
        return await Employee.find();
      } catch (error) {
        throw new GraphQLError("Failed to fetch employees", {
          extensions: { code: "INTERNAL_SERVER_ERROR", details: error.message },
        });
      }
    },

    getEmployeeById: async (_, { eid }, { user }) => {
      if (!user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      try {
        const employee = await Employee.findById(eid);
        if (!employee) {
          throw new GraphQLError("Employee not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return employee;
      } catch (error) {
        throw new GraphQLError("Error retrieving employee", {
          extensions: { code: "INTERNAL_SERVER_ERROR", details: error.message },
        });
      }
    },

    searchEmployeeByDesignationOrDepartment: async (
      _,
      { designation, department },
      { user }
    ) => {
      if (!user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      try {
        const filter = {};

        if (designation) filter.designation = designation;
        if (department) filter.department = department;

        const employees = await Employee.find(filter);

        if (!employees || employees.length === 0) {
          throw new GraphQLError("No employees found", {
            extensions: { code: "NOT_FOUND" },
          });
        }

        return employees;
      } catch (error) {
        throw new GraphQLError("Error retrieving employees", {
          extensions: { code: "INTERNAL_SERVER_ERROR", details: error.message },
        });
      }
    },
  },

  Mutation: {
    addEmployee: async (_, args, { user }) => {
      if (!user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      try {
        const newEmployee = new Employee(args);
        return await newEmployee.save();
      } catch (error) {
        throw new GraphQLError("Failed to add employee", {
          extensions: { code: "BAD_USER_INPUT", details: error.message },
        });
      }
    },

    updateEmployee: async (_, { eid, ...updateData }, { user }) => {
      if (!user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "Unauthorized" },
        });
      }
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
          eid,
          updateData,
          { new: true }
        );
        if (!updatedEmployee) {
          throw new GraphQLError("Employee not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return updatedEmployee;
      } catch (error) {
        throw new GraphQLError("Error updating employee", {
          extensions: { code: "INTERNAL_SERVER_ERROR", details: error.message },
        });
      }
    },

    deleteEmployee: async (_, { eid }, { user }) => {
      if (!user) {
        throw new GraphQLError("Unauthorized", {
          extensions: { code: "Unauthorized" },
        });
      }
      try {
        const deletedEmployee = await Employee.findByIdAndDelete(eid);
        if (!deletedEmployee) {
          throw new GraphQLError("Employee not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }
        return deletedEmployee;
      } catch (error) {
        throw new GraphQLError("Error deleting employee", {
          extensions: { code: "INTERNAL_SERVER_ERROR", details: error.message },
        });
      }
    },
  },
};

module.exports = employeeResolvers;
