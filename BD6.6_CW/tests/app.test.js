const request = require("supertest") ; 
const http = require("http");
const {getAllEmployees} = require("../controllers");
const {app} = require("../index");

jest.mock("../controllers",()=>({
    ...jest.requireActual("../controllers") , 
    getAllEmployees : jest.fn(),
}));


let server ;

beforeAll(async ()=>{
   server = http.createServer(app);
  server.listen(3001) ; 
});

afterAll(async ()=>{
  server.close();
});

describe("controller Function tests", ()=>{
  beforeEach(()=>{
    jest.clearAllMocks();
  }) ;

  it("Should return all employees",()=>{
    let mockedEmployees =  [
        {
          employeeId: 1,
          name: "Rahul Sharma",
          email: "rahul.sharma@example.com",
          departmentId: 1,
          roleId: 1,
        },
        {
          employeeId: 2,
          name: "Priya Singh",
          email: "priya.singh@example.com",
          departmentId: 2,
          roleId: 2,
        },
        {
          employeeId: 3,
          name: "Ankit Verma",
          email: "ankit.verma@example.com",
          departmentId: 1,
          roleId: 3,
        },
      ];

    getAllEmployees.mockReturnValue(mockedEmployees);
    let result = getAllEmployees();
    expect(result).toEqual(mockedEmployees);
    expect(result.length).toBe(3) ; 
  });
  
  
});

describe("API endpoint tests",()=>{
   it("GET /employees should get all employees",async ()=>{
    const res = await request(app).get("/employees");
     expect(res.status).toBe(200);
     expect(res.body).toEqual({
         employees :  [
             {
               employeeId: 1,
               name: "Rahul Sharma",
               email: "rahul.sharma@example.com",
               departmentId: 1,
               roleId: 1,
             },
             {
               employeeId: 2,
               name: "Priya Singh",
               email: "priya.singh@example.com",
               departmentId: 2,
               roleId: 2,
             },
             {
               employeeId: 3,
               name: "Ankit Verma",
               email: "ankit.verma@example.com",
               departmentId: 1,
               roleId: 3,
             },
           ],
     });
     expect(res.body.employees.length).toBe(3);
     
   });

   it("GET /employees/details/:id should get employee details by id",async()=>{
     const res = await request(app).get("/employees/details/1");
     expect(res.status).toBe(200);
     expect(res.body).toEqual({
       emplyee : {
         employeeId: 1,
         name: "Rahul Sharma",
         email: "rahul.sharma@example.com",
         departmentId: 1,
         roleId: 1,
       },
     });
   });
 
  
});