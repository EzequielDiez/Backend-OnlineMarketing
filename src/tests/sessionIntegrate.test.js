import initServer from "./index.js";
import { faker } from "@faker-js/faker"
import supertest from "supertest";

describe ("Testing Session Endpoints", () => 
{
    let requester;
    let db;
    let jwt = "";
    let userPayload = {};

    beforeAll (async () => 
    {
        const server = await initServer()
        const application = server.app.callback()
        requester = supertest.agent(application)
        db = server.db
        userPayload = 
        {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        }
    })

    afterAll (async () => 
    {
        await db.close()
    })

    describe ("Testing Session Endpoints Success", () => 
    {
        test ("Create account /api/sessions/signup", async () => 
        {
            const signupResult = await requester
            .post ("/api/sessions/signup")
            .send (userPayload)
            .expect (201)

            const { body: signupBody } = signupResult

            expect (signupBody.message).toBe("You have successfully registered")
        })

        test ("Login with account /api/sessions/login", async () => 
        {
            const loginCredentials = 
            {
                email: userPayload.email,
                password: userPayload.password,
            }

            const loginResult = await requester
            .post ("/api/sessions/login")
            .send (loginCredentials)
            .expect (200)

            const { body: loginBody } = loginResult

            expect (loginBody.message).toBe("You have successfully logged in")
            expect (loginBody.accessToken).toBeTruthy()

            jwt = loginBody.accessToken
        })

        test ("Get current account /api/sessions/current", async () => 
        {
            const getCurrentResult = await requester
            .get ("/api/sessions/current")
            .set ("Authorization", `Bearer ${jwt}`)
            .expect (200)

            const { body: getCurrentBody } = getCurrentResult

            console.log("getCurrentBody", getCurrentBody);

            expect (getCurrentBody.payload.email.toLowerCase()).toBe(userPayload.email.toLowerCase())
            expect (getCurrentBody.payload.firstName).toBe(userPayload.firstName)
            expect (getCurrentBody.payload.lastName).toBe(userPayload.lastName)
        })
    })
})