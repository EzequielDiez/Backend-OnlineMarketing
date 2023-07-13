/* import initServer from "./index.js";
import { faker } from "@faker-js/faker";
import supertest from "supertest";

describe ("Testing Products Endpoints", () => 
{
    let requester;
    let db;
    let jwt = "";
    let product = {};

    beforeAll (async () => 
    {
        const server = await initServer()
        const application = server.app.callback()
        requester = supertest.agent(application)
        db = server.db
        jwt = (await requester.post("api/sessions/login")
        .send({ email: "ezequiel.diez@slideshare.net", password: "1234567890"})).body.token
    })

    afterAll (async () => 
    {
        await db.close()
    })

    describe ("Testing Products Endpoints Success", () =>
    {
        test ("Get products /api/products", async () => 
        {
            const { body } = await requester
            .get ("/api/products")
            .expect (200)

            expect (body.data.payload).toBeTruthy()

            product = body.data.payload[0]
        })
    })
}) */


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
        jwt = (await requester.post("/api/sessions/login").send({
            email: "ezequiel.diez@slideshare.net",
            password: "1234567890",
        })).body.accessToken;
    });

    afterAll(async () => {
        await db.close();
    });

    describe("Testing Products Endpoints Success", () => {
        test("Get products /api/products", async () => {

            const response = await requester.get("/api/products").set ("Authorization", `Bearer ${jwt}`).expect(200);

            const { products } = response.body

            console.log("response._body", response.body.products.paginate({ limit: 5 , page: 1}));

/*             expect(response._body.products.pagination.totalDocs).toBeGreaterThan(0);
            console.log("Payload exists"); */
            expect(products.pagination.totalDocs).toBeGreaterThan(0)
            console.log("Payload exists")

            product = products.docs[0]
            console.log("product", product);

            /* product = body.data.payload[0] */
        });
    });
});