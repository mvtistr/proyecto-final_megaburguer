const request = require('supertest');
const app = require('../../server.js');

describe('API Products', () => {

    test('GET /products - devuelve 200', async () => {
        const response = await request(app).get('/api/products');
        expect(response.statusCode).toBe(200);
    });

  test("Ruta protegida sin token devuelve 401", async () => {
    const res = await request(app)
      .post("/api/products");
    expect(res.statusCode).toBe(401);
  });

  test("POST /login sin datos devuelve 400", async () => {
    const res = await request(app)
    .post("/api/auth/login")
    .send({});
    expect(res.statusCode).toBe(400);
  });

  test("Ruta inexistente devuelve 404", async () => {
    const res = await request(app)
      .get("/ruta-que-no-existe");
    expect(res.statusCode).toBe(404);
  });
});