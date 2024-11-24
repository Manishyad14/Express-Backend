let employees = [
  { id: 1, name: 'John Doe', position: 'Software Engineer' },
  { id: 2, name: 'Jane Smith', position: 'Product Manager' },
  { id: 3, name: 'Sam Johnson', position: 'Designer' },
  { id: 4, name: 'Lisa Brown', position: 'DevOps Engineer' }
];

// Function to get all employees
function getEmployees() {
  return employees;
}

// Function to get an employee by ID
function getEmployeeById(id) {
  return employees.find((employee) => employee.id === id);
}

// Function to add a new employee
function addEmployee(employee) {
  let newEmployee = { id: employees.length + 1, ...employee };
  employees.push(newEmployee);
  return newEmployee;
}

module.exports = { getEmployees, getEmployeeById, addEmployee };
