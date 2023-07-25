import initServer from "./index.js";
import { faker } from "@faker-js/faker";
import supertest from "supertest";

describe("Testing Products Endpoints", () => {
    let requester;
    let db;
    let jwt = "";
    let product = {};

    beforeAll(async () => {
        const server = await initServer();
        const application = server.app.callback();
        requester = supertest.agent(application);
        db = server.db;
        const loginResponse = await requester
            .post("/api/sessions/login")
            .send({
                email: "ezequiel.diez@slideshare.net",
                password: "1234567890",
            });
        jwt = loginResponse.body.accessToken;
    });

    afterAll(async () => {
        await db.close();
    });

    describe("Testing Products Endpoints Success", () => {
        test("Get products /api/products", async () => {
            const response = await requester
                .get("/api/products")
                .expect(200);
            const products = response.body.products;
            expect(Array.isArray(products)).toBe(true);
            expect(products.length).toBeGreaterThan(1); 

            product = products[0]
        });

        test("Get product /api/products/:pid", async () => {
            const response = await requester
                .get(`/api/products/${product.id}`)
                .expect(200);
            const { body } = response;
            expect(body.product).toBeTruthy();
            expect(body.product.id).toBe(product.id);
        });

        test("Get products with limit /api/products/?limit=5", async () => {
            const response = await requester
                .get("/api/products/?limit=5")
                .expect(200);
            const products = response.body.products;
            expect(Array.isArray(products)).toBe(true);
            expect(products.length).toBe(5); 
        });

        test("Get products with paginate /api/products/?page=2", async () => {
            const response = await requester
                .get("/api/products/?page=2")
                .expect(200);
            const products = response.body.products;
            expect(Array.isArray(products)).toBe(true);
            expect(response.body.pagination.page).toBe(2);
        });

        test("Create product /api/products/", async () => {
            const data = {
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                code: faker.string.numeric(10),
                price:  faker.commerce.price({ min: 1000, max: 10000}),
                status: true,
                stock: faker.number.int({min: 5, max: 50}),
                category: faker.commerce.productMaterial(),
                thumbnails: faker.commerce.product()
            }

            const response = await requester
                .post("/api/products/")
                .set ("Authorization", `Bearer ${jwt}`)
                .send(data)
                .expect(201);
            const { body } = response;
            expect(body.message).toBe("Product created.");
        });

        test("Update product /api/products/:pid", async () => {
            const data = {
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                code: faker.string.numeric(10),
                price:  faker.commerce.price({ min: 1000, max: 10000}),
                status: true,
                stock: faker.number.int({min: 5, max: 50}),
                category: faker.commerce.productMaterial(),
                thumbnails: faker.commerce.product()
            }

            const response = await requester
                .put(`/api/products/${product.id}`)
                .set("Authorization", `Bearer ${jwt}`)
                .send(data)
                .expect(200);
            const { body } = response;
            expect(body.message).toBe("Product updated.");
        });

        test("Delete product /api/products/:pid", async () => {
            const response = await requester
                .delete(`/api/products/${product.id}`)
                .set("Authorization", `Bearer ${jwt}`)
                .expect(200);
            const { body } = response;
            expect(body.message).toBe("Product deleted."); 
        });
    });

    describe("Testing Products Endpoints Fails", () => {

        test("Create product with missing required fields /api/products/", async () => {
            const data = { };

            const response = await requester
                .post("/api/products/")
                .set("Authorization", `Bearer ${jwt}`)
                .send(data)
                .expect(400);
            const { body } = response;
            expect(body.message).toBe("Missing required fields.");
        });

        test("Create product without authorization token /api/products/", async () => {
            const data = {
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                code: faker.string.numeric(10),
                price:  faker.commerce.price({ min: 1000, max: 10000}),
                status: true,
                stock: faker.number.int({min: 5, max: 50}),
                category: faker.commerce.productMaterial(),
                thumbnails: faker.commerce.product()
            };

            const response = await requester
                .post("/api/products/")
                .send(data)
                .expect(401);
            const { body } = response;
            expect(body.message).toBe("Missing or invalid token.");
        });

        test("Update product without authorization token /api/products/:pid", async () => {
            const data = {
                title: faker.commerce.productName(),
            };

            const response = await requester
                .put(`/api/products/${product.id}`)
                .send(data)
                .expect(401);
            const { body } = response;
            expect(body.message).toBe("Missing or invalid token.");
        });

        test("Delete product without authorization token /api/products/:pid", async () => {
            const response = await requester
                .delete(`/api/products/${product.id}`)
                .expect(401);
            const { body } = response;
            expect(body.message).toBe("Missing or invalid token.");
        });
    });
});