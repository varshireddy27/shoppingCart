const request = require("supertest");
const app = require("../app");
// const connect_to_database = require("../dbconfig");
// connect_to_database();
describe("POST/api/user/signUp", () => {
  it("creating a new user", async () => {
    const res = await request(app)
    .post("/api/user/signUp")
    .send({
      firstName: "Vedhansh",
      lastName: "Reddy",
      email: "vedhansh@gmail.com",
      password: "vedhansh",
    });
    // // expect(res.statusCode).toBe(200);
    // expect(res.body.message).toBe("User created Successfully");
    // // expect(res.body.data).toBe("resObj");
  });
  it('should return 400 if email is already existed', async () => {
    const res = await request(app).post('/register').send({
            email: "vedhansh@example.com",
            password: "vedhansh"
        });

        // expect(res.status).toBe(400);
        // expect(res.body.message).toBe("Email already registered");
    });
  })

