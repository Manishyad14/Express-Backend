const {
  getEmployees,
  getEmployeeById,
  addEmployee,
} = require("../employee.js");

describe("Employees Functions", () => {
  it("should get all employees", () => {
    let employees = getEmployees();
    expect(employees.length).toBe(4);
    expect(employees).toEqual([
      { id: 1, name: "John Doe", position: "Software Engineer" },
      { id: 2, name: "Jane Smith", position: "Product Manager" },
      { id: 3, name: "Sam Johnson", position: "Designer" },
      { id: 4, name: "Lisa Brown", position: "DevOps Engineer" },
    ]);
  });

  it("should get an employee by id", () => {
    let employee = getEmployeeById(1);
    expect(employee).toEqual({
      id: 1,
      name: "John Doe",
      position: "Software Engineer",
    });
  });

  it("should return undefined for an employee id which is not present", () => {
    let employee = getEmployeeById(99);
    expect(employee).toBeUndefined();
  });

  it("should add a new employee", () => {
    let newEmployee = { name: "Tom Harris", position: "HR Manager" };
    let addedEmployee = addEmployee(newEmployee);
    expect(addedEmployee).toEqual({
      id: 5,
      name: "Tom Harris",
      position: "HR Manager",
    });
  });
});
